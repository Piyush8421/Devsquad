const express = require('express');
const db = require('../config/database');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// @route GET /api/users/profile
// @desc Get user profile
// @access Private
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await db('users')
      .select('id', 'first_name', 'last_name', 'email', 'phone', 'role', 'avatar', 'created_at')
      .where({ id: req.user.id })
      .first();

    res.json({
      success: true,
      data: { user }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting profile'
    });
  }
});

// @route PUT /api/users/profile
// @desc Update user profile
// @access Private
router.put('/profile', auth, async (req, res) => {
  try {
    const { firstName, lastName, phone } = req.body;

    const [user] = await db('users')
      .where({ id: req.user.id })
      .update({
        first_name: firstName,
        last_name: lastName,
        phone,
        updated_at: new Date()
      })
      .returning(['id', 'first_name', 'last_name', 'email', 'phone', 'role', 'avatar']);

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: { user }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating profile'
    });
  }
});

// @route GET /api/users
// @desc Get all users (Admin only)
// @access Private/Admin
router.get('/', adminAuth, async (req, res) => {
  try {
    const { page = 1, limit = 10, role } = req.query;
    const offset = (page - 1) * limit;

    let query = db('users')
      .select('id', 'first_name', 'last_name', 'email', 'role', 'created_at');

    if (role) {
      query = query.where('role', role);
    }

    const users = await query
      .orderBy('created_at', 'desc')
      .limit(limit)
      .offset(offset);

    const total = await db('users').count('* as count').first();

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total.count / limit),
          totalItems: parseInt(total.count)
        }
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting users'
    });
  }
});

module.exports = router;
