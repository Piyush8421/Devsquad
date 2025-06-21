const express = require('express');
const Joi = require('joi');
const db = require('../config/database');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Validation schema
const reviewSchema = Joi.object({
  propertyId: Joi.number().integer().required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().min(10).max(1000).required()
});

// @route POST /api/reviews
// @desc Create new review
// @access Private
router.post('/', auth, async (req, res) => {
  try {
    const { error, value } = reviewSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const { propertyId, rating, comment } = value;

    // Check if user has a completed booking for this property
    const completedBooking = await db('bookings')
      .where({
        user_id: req.user.id,
        property_id: propertyId,
        status: 'completed'
      })
      .first();

    if (!completedBooking) {
      return res.status(400).json({
        success: false,
        message: 'You can only review properties you have stayed at'
      });
    }

    // Check if user has already reviewed this property
    const existingReview = await db('reviews')
      .where({
        user_id: req.user.id,
        property_id: propertyId
      })
      .first();

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this property'
      });
    }

    // Create review
    const [review] = await db('reviews').insert({
      user_id: req.user.id,
      property_id: propertyId,
      rating,
      comment,
      created_at: new Date(),
      updated_at: new Date()
    }).returning('*');

    res.status(201).json({
      success: true,
      message: 'Review created successfully',
      data: { review }
    });
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating review'
    });
  }
});

// @route GET /api/reviews/property/:propertyId
// @desc Get reviews for a property
// @access Public
router.get('/property/:propertyId', async (req, res) => {
  try {
    const { propertyId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const reviews = await db('reviews')
      .join('users', 'reviews.user_id', 'users.id')
      .select(
        'reviews.*',
        'users.first_name',
        'users.last_name',
        'users.avatar'
      )
      .where('reviews.property_id', propertyId)
      .orderBy('reviews.created_at', 'desc')
      .limit(limit)
      .offset(offset);

    const total = await db('reviews')
      .where('property_id', propertyId)
      .count('* as count')
      .first();

    // Get rating summary
    const ratingSummary = await db('reviews')
      .select('rating')
      .count('* as count')
      .where('property_id', propertyId)
      .groupBy('rating')
      .orderBy('rating', 'desc');

    const avgRating = await db('reviews')
      .avg('rating as avg_rating')
      .where('property_id', propertyId)
      .first();

    res.json({
      success: true,
      data: {
        reviews,
        ratingSummary,
        avgRating: avgRating.avg_rating ? parseFloat(avgRating.avg_rating).toFixed(1) : null,
        totalReviews: parseInt(total.count),
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total.count / limit),
          totalItems: parseInt(total.count)
        }
      }
    });
  } catch (error) {
    console.error('Get property reviews error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting reviews'
    });
  }
});

// @route GET /api/reviews/user
// @desc Get user's reviews
// @access Private
router.get('/user', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const reviews = await db('reviews')
      .join('properties', 'reviews.property_id', 'properties.id')
      .select(
        'reviews.*',
        'properties.title as property_title',
        'properties.city as property_city',
        'properties.images as property_images'
      )
      .where('reviews.user_id', req.user.id)
      .orderBy('reviews.created_at', 'desc')
      .limit(limit)
      .offset(offset);

    const total = await db('reviews')
      .where('user_id', req.user.id)
      .count('* as count')
      .first();

    res.json({
      success: true,
      data: {
        reviews,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total.count / limit),
          totalItems: parseInt(total.count)
        }
      }
    });
  } catch (error) {
    console.error('Get user reviews error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting reviews'
    });
  }
});

// @route PUT /api/reviews/:id
// @desc Update review
// @access Private
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = Joi.object({
      rating: Joi.number().integer().min(1).max(5).required(),
      comment: Joi.string().min(10).max(1000).required()
    }).validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const { rating, comment } = value;

    // Check if review exists and belongs to user
    const existingReview = await db('reviews')
      .where({ id, user_id: req.user.id })
      .first();

    if (!existingReview) {
      return res.status(404).json({
        success: false,
        message: 'Review not found or access denied'
      });
    }

    // Update review
    const [review] = await db('reviews')
      .where({ id })
      .update({
        rating,
        comment,
        updated_at: new Date()
      })
      .returning('*');

    res.json({
      success: true,
      message: 'Review updated successfully',
      data: { review }
    });
  } catch (error) {
    console.error('Update review error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating review'
    });
  }
});

// @route DELETE /api/reviews/:id
// @desc Delete review
// @access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if review exists and belongs to user
    const existingReview = await db('reviews')
      .where({ id, user_id: req.user.id })
      .first();

    if (!existingReview) {
      return res.status(404).json({
        success: false,
        message: 'Review not found or access denied'
      });
    }

    // Delete review
    await db('reviews').where({ id }).del();

    res.json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting review'
    });
  }
});

module.exports = router;
