const express = require('express');
const Joi = require('joi');
const db = require('../config/database');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Validation schemas
const paymentIntentSchema = Joi.object({
  propertyId: Joi.number().integer().required(),
  checkIn: Joi.date().required(),
  checkOut: Joi.date().greater(Joi.ref('checkIn')).required(),
  guests: Joi.number().integer().min(1).required(),
  totalAmount: Joi.number().positive().required(),
  currency: Joi.string().default('NPR'),
  paymentMethod: Joi.string().valid('card', 'esewa', 'khalti').required(),
  notes: Joi.string().max(500).optional()
});

const paymentConfirmSchema = Joi.object({
  paymentIntentId: Joi.string().required(),
  paymentMethodId: Joi.string().optional(),
  paymentProvider: Joi.string().valid('stripe', 'esewa', 'khalti').required()
});

// @route POST /api/payments/create-intent
// @desc Create payment intent
// @access Private
router.post('/create-intent', auth, async (req, res) => {
  try {
    const { error, value } = paymentIntentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const { propertyId, checkIn, checkOut, guests, totalAmount, currency, paymentMethod, notes } = value;

    // Verify property exists and is available
    const property = await db('properties')
      .where({ id: propertyId, is_active: true, availability: true })
      .first();

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found or unavailable'
      });
    }

    // Check for conflicting bookings
    const conflictingBooking = await db('bookings')
      .where('property_id', propertyId)
      .where('status', 'confirmed')
      .where(function() {
        this.whereBetween('check_in', [checkIn, checkOut])
          .orWhereBetween('check_out', [checkIn, checkOut])
          .orWhere(function() {
            this.where('check_in', '<=', checkIn)
              .where('check_out', '>=', checkOut);
          });
      })
      .first();

    if (conflictingBooking) {
      return res.status(400).json({
        success: false,
        message: 'Property is not available for the selected dates'
      });
    }

    // Create payment intent (in production, this would integrate with actual payment processors)
    const paymentIntent = {
      id: `pi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      amount: totalAmount,
      currency,
      status: 'requires_payment_method',
      client_secret: `pi_${Date.now()}_secret_${Math.random().toString(36).substr(2, 9)}`,
      created: new Date().toISOString(),
      metadata: {
        propertyId,
        checkIn,
        checkOut,
        guests,
        userId: req.user.id,
        notes: notes || ''
      }
    };

    // In production, you would:
    // 1. Create actual payment intent with Stripe/other processor
    // 2. Store payment intent in database
    // 3. Return client secret for frontend to confirm payment

    res.status(201).json({
      success: true,
      message: 'Payment intent created successfully',
      data: { paymentIntent }
    });
  } catch (error) {
    console.error('Create payment intent error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating payment intent'
    });
  }
});

// @route POST /api/payments/confirm
// @desc Confirm payment and create booking
// @access Private
router.post('/confirm', auth, async (req, res) => {
  try {
    const { error, value } = paymentConfirmSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const { paymentIntentId, paymentMethodId, paymentProvider } = value;

    // In production, you would:
    // 1. Verify payment with the payment processor
    // 2. Confirm the payment was successful
    // 3. Create the booking only after successful payment

    // For demo purposes, we'll simulate successful payment
    const mockPaymentVerification = {
      status: 'succeeded',
      amount_received: 5000, // This would come from the payment processor
      currency: 'NPR'
    };

    if (mockPaymentVerification.status !== 'succeeded') {
      return res.status(400).json({
        success: false,
        message: 'Payment failed or was not completed'
      });
    }    // Extract booking data from payment intent metadata
    // In production, this would be retrieved from your database
    // For now, we'll decode it from the payment intent ID pattern
    const mockPaymentIntentMetadata = {
      propertyId: parseInt(req.body.propertyId) || 1,
      checkIn: req.body.checkIn || '2024-07-01',
      checkOut: req.body.checkOut || '2024-07-03',
      guests: parseInt(req.body.guests) || 2,
      userId: req.user.id,
      totalAmount: parseInt(req.body.totalAmount) || mockPaymentVerification.amount_received
    };

    const bookingData = {
      user_id: mockPaymentIntentMetadata.userId,
      property_id: mockPaymentIntentMetadata.propertyId,
      check_in: mockPaymentIntentMetadata.checkIn,
      check_out: mockPaymentIntentMetadata.checkOut,
      guests: mockPaymentIntentMetadata.guests,
      total_price: mockPaymentIntentMetadata.totalAmount,
      status: 'confirmed',
      payment_intent_id: paymentIntentId,
      payment_method: paymentProvider,
      created_at: new Date(),
      updated_at: new Date()
    };

    // Create the booking
    const [booking] = await db('bookings').insert(bookingData).returning('*');

    // Create payment record
    const paymentRecord = {
      booking_id: booking.id,
      user_id: req.user.id,
      amount: mockPaymentVerification.amount_received,
      currency: mockPaymentVerification.currency,
      payment_intent_id: paymentIntentId,
      payment_method: paymentProvider,
      status: 'completed',
      created_at: new Date(),
      updated_at: new Date()
    };

    // In production, you would have a payments table
    // await db('payments').insert(paymentRecord);

    res.json({
      success: true,
      message: 'Payment confirmed and booking created successfully',
      data: { 
        booking,
        payment: paymentRecord
      }
    });
  } catch (error) {
    console.error('Confirm payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error confirming payment'
    });
  }
});

// @route GET /api/payments/history
// @desc Get user's payment history
// @access Private
router.get('/history', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    // In production, you would query from a payments table
    // For now, we'll return booking data as payment history
    const payments = await db('bookings')
      .join('properties', 'bookings.property_id', 'properties.id')
      .select(
        'bookings.id',
        'bookings.total_price as amount',
        'bookings.status',
        'bookings.created_at',
        'properties.title as property_title',
        'properties.currency'
      )
      .where('bookings.user_id', req.user.id)
      .where('bookings.status', '!=', 'pending')
      .orderBy('bookings.created_at', 'desc')
      .limit(limit)
      .offset(offset);

    const total = await db('bookings')
      .where('user_id', req.user.id)
      .where('status', '!=', 'pending')
      .count('* as count')
      .first();

    res.json({
      success: true,
      data: {
        payments,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total.count / limit),
          totalItems: parseInt(total.count)
        }
      }
    });
  } catch (error) {
    console.error('Get payment history error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting payment history'
    });
  }
});

module.exports = router;
