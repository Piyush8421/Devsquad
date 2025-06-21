const express = require('express');
const Joi = require('joi');
const db = require('../config/database');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Validation schemas
const bookingSchema = Joi.object({
  propertyId: Joi.number().integer().required(),
  checkIn: Joi.date().required(),
  checkOut: Joi.date().greater(Joi.ref('checkIn')).required(),
  guests: Joi.number().integer().min(1).required(),
  totalPrice: Joi.number().positive().required(),
  notes: Joi.string().max(500).optional()
});

// @route POST /api/bookings
// @desc Create new booking
// @access Private
router.post('/', auth, async (req, res) => {
  try {
    const { error, value } = bookingSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const { propertyId, checkIn, checkOut, guests, totalPrice, notes } = value;

    // Check if property exists and is available
    const property = await db('properties')
      .where({ id: propertyId, is_active: true, availability: true })
      .first();

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found or unavailable'
      });
    }

    // Check if property can accommodate the number of guests
    if (guests > property.max_guests) {
      return res.status(400).json({
        success: false,
        message: `Property can only accommodate ${property.max_guests} guests`
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

    // Create booking
    const [booking] = await db('bookings').insert({
      user_id: req.user.id,
      property_id: propertyId,
      check_in: checkIn,
      check_out: checkOut,
      guests,
      total_price: totalPrice,
      notes,
      status: 'pending',
      created_at: new Date(),
      updated_at: new Date()
    }).returning('*');

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: { booking }
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating booking'
    });
  }
});

// @route GET /api/bookings
// @desc Get user's bookings
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    let query = db('bookings')
      .join('properties', 'bookings.property_id', 'properties.id')
      .join('users as hosts', 'properties.host_id', 'hosts.id')
      .select(
        'bookings.*',
        'properties.title as property_title',
        'properties.city as property_city',
        'properties.images as property_images',
        'hosts.first_name as host_first_name',
        'hosts.last_name as host_last_name'
      )
      .where('bookings.user_id', req.user.id);

    if (status) {
      query = query.where('bookings.status', status);
    }

    const bookings = await query
      .orderBy('bookings.created_at', 'desc')
      .limit(limit)
      .offset(offset);

    const total = await db('bookings')
      .where('user_id', req.user.id)
      .count('* as count')
      .first();

    res.json({
      success: true,
      data: {
        bookings,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total.count / limit),
          totalItems: parseInt(total.count)
        }
      }
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting bookings'
    });
  }
});

// @route GET /api/bookings/:id
// @desc Get single booking
// @access Private
router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await db('bookings')
      .join('properties', 'bookings.property_id', 'properties.id')
      .join('users as hosts', 'properties.host_id', 'hosts.id')
      .select(
        'bookings.*',
        'properties.title as property_title',
        'properties.address as property_address',
        'properties.city as property_city',
        'properties.images as property_images',
        'hosts.first_name as host_first_name',
        'hosts.last_name as host_last_name',
        'hosts.email as host_email',
        'hosts.phone as host_phone'
      )
      .where('bookings.id', id)
      .where('bookings.user_id', req.user.id)
      .first();

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      data: { booking }
    });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting booking'
    });
  }
});

// @route PUT /api/bookings/:id/cancel
// @desc Cancel booking
// @access Private
router.put('/:id/cancel', auth, async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await db('bookings')
      .where({ id, user_id: req.user.id })
      .first();

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Booking is already cancelled'
      });
    }

    if (booking.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel completed booking'
      });
    }

    await db('bookings')
      .where({ id })
      .update({
        status: 'cancelled',
        updated_at: new Date()
      });

    res.json({
      success: true,
      message: 'Booking cancelled successfully'
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error cancelling booking'
    });
  }
});

module.exports = router;
