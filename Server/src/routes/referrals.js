const express = require('express');
const Joi = require('joi');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Validation schema for referral
const referralSchema = Joi.object({
  refereeEmail: Joi.string().email().required(),
  refereeName: Joi.string().min(2).max(100).required(),
  message: Joi.string().max(500).optional()
});

// @route GET /api/referrals/info
// @desc Get referral program information
// @access Public
router.get('/info', async (req, res) => {
  try {
    const referralInfo = {
      program: {
        title: "Kostra Referral Program",
        description: "Earn rewards by referring friends to Kostra",
        howItWorks: [
          {
            step: 1,
            title: "Share Your Code",
            description: "Send your unique referral code to friends"
          },
          {
            step: 2,
            title: "Friend Signs Up",
            description: "Your friend creates an account using your code"
          },
          {
            step: 3,
            title: "Friend Books",
            description: "Your friend completes their first booking"
          },
          {
            step: 4,
            title: "Both Get Rewards",
            description: "You both receive travel credits"
          }
        ],
        rewards: {
          referrer: {
            amount: 1000,
            currency: "NPR",
            description: "You get NPR 1,000 travel credit"
          },
          referee: {
            amount: 500,
            currency: "NPR",
            description: "Your friend gets NPR 500 off their first booking"
          }
        },
        terms: [
          "Referral bonus is credited after the referred user completes their first booking",
          "Minimum booking value of NPR 2,000 required for bonus eligibility",
          "Credits expire after 12 months if unused",
          "Self-referrals are not allowed",
          "Kostra reserves the right to modify terms at any time"
        ],
        faq: [
          {
            question: "How do I get my referral code?",
            answer: "Your unique referral code is available in your account dashboard after you sign up."
          },
          {
            question: "When do I receive my referral bonus?",
            answer: "You'll receive your bonus within 7 days after your referred friend completes their first booking."
          },
          {
            question: "Is there a limit to how many people I can refer?",
            answer: "No, you can refer as many friends as you like and earn bonuses for each successful referral."
          },
          {
            question: "Can I refer someone who already has an account?",
            answer: "No, referral bonuses only apply to new users who sign up with your referral code."
          }
        ]
      }
    };

    res.json({
      success: true,
      data: referralInfo
    });
  } catch (error) {
    console.error('Get referral info error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting referral information'
    });
  }
});

// @route GET /api/referrals/my-code
// @desc Get user's referral code and stats
// @access Private
router.get('/my-code', auth, async (req, res) => {
  try {
    // Generate referral code based on user ID (in production, store this in database)
    const referralCode = `KOSTRA${req.user.id.toString().padStart(6, '0')}`;
    
    // In production, fetch actual stats from database
    const referralStats = {
      code: referralCode,
      totalReferrals: 5,
      successfulReferrals: 3,
      pendingReferrals: 2,
      totalEarned: 3000,
      availableCredits: 2500,
      usedCredits: 500,
      recentReferrals: [
        {
          id: 1,
          refereeName: "Alice Johnson",
          refereeEmail: "alice@example.com",
          status: "completed",
          reward: 1000,
          referredAt: "2024-06-10T10:30:00Z",
          completedAt: "2024-06-15T14:20:00Z"
        },
        {
          id: 2,
          refereeName: "Bob Smith",
          refereeEmail: "bob@example.com",
          status: "pending",
          reward: 0,
          referredAt: "2024-06-18T16:45:00Z",
          completedAt: null
        }
      ]
    };

    res.json({
      success: true,
      data: referralStats
    });
  } catch (error) {
    console.error('Get referral code error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting referral code'
    });
  }
});

// @route POST /api/referrals/send
// @desc Send referral invitation
// @access Private
router.post('/send', auth, async (req, res) => {
  try {
    const { error, value } = referralSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const { refereeEmail, refereeName, message } = value;

    // Generate referral code
    const referralCode = `KOSTRA${req.user.id.toString().padStart(6, '0')}`;

    // In production, you would:
    // 1. Check if referee email is already registered
    // 2. Save referral to database
    // 3. Send email invitation to referee
    // 4. Track referral metrics

    // Create referral record (demo)
    const referral = {
      id: Date.now(),
      referrerId: req.user.id,
      referrerName: `${req.user.first_name} ${req.user.last_name}`,
      refereeEmail,
      refereeName,
      message,
      referralCode,
      status: 'sent',
      sentAt: new Date().toISOString()
    };

    res.status(201).json({
      success: true,
      message: `Referral invitation sent to ${refereeName} successfully!`,
      data: { referral }
    });
  } catch (error) {
    console.error('Send referral error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error sending referral'
    });
  }
});

// @route GET /api/referrals/my-referrals
// @desc Get user's referral history
// @access Private
router.get('/my-referrals', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    
    // In production, fetch from database
    let referrals = [
      {
        id: 1,
        refereeName: "Alice Johnson",
        refereeEmail: "alice@example.com",
        status: "completed",
        reward: 1000,
        referredAt: "2024-06-10T10:30:00Z",
        completedAt: "2024-06-15T14:20:00Z"
      },
      {
        id: 2,
        refereeName: "Bob Smith",
        refereeEmail: "bob@example.com",
        status: "pending",
        reward: 0,
        referredAt: "2024-06-18T16:45:00Z",
        completedAt: null
      },
      {
        id: 3,
        refereeName: "Carol Davis",
        refereeEmail: "carol@example.com",
        status: "completed",
        reward: 1000,
        referredAt: "2024-06-05T09:15:00Z",
        completedAt: "2024-06-12T11:30:00Z"
      },
      {
        id: 4,
        refereeName: "David Wilson",
        refereeEmail: "david@example.com",
        status: "expired",
        reward: 0,
        referredAt: "2024-05-01T14:00:00Z",
        completedAt: null
      }
    ];

    // Apply status filter
    if (status) {
      referrals = referrals.filter(ref => ref.status === status);
    }

    const offset = (page - 1) * limit;
    const paginatedReferrals = referrals.slice(offset, offset + limit);

    res.json({
      success: true,
      data: {
        referrals: paginatedReferrals,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(referrals.length / limit),
          totalItems: referrals.length
        },
        summary: {
          total: referrals.length,
          completed: referrals.filter(r => r.status === 'completed').length,
          pending: referrals.filter(r => r.status === 'pending').length,
          expired: referrals.filter(r => r.status === 'expired').length
        }
      }
    });
  } catch (error) {
    console.error('Get referrals error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting referrals'
    });
  }
});

// @route POST /api/referrals/validate
// @desc Validate referral code
// @access Public
router.post('/validate', async (req, res) => {
  try {
    const { referralCode } = req.body;

    if (!referralCode) {
      return res.status(400).json({
        success: false,
        message: 'Referral code is required'
      });
    }

    // Extract user ID from referral code (demo logic)
    const codePattern = /^KOSTRA(\d{6})$/;
    const match = referralCode.match(codePattern);

    if (!match) {
      return res.status(400).json({
        success: false,
        message: 'Invalid referral code format'
      });
    }

    const referrerId = parseInt(match[1]);

    // In production, check if user exists in database
    // For demo, assume valid if follows pattern
    if (referrerId > 0) {
      res.json({
        success: true,
        message: 'Valid referral code',
        data: {
          isValid: true,
          referralCode,
          bonus: {
            amount: 500,
            currency: 'NPR',
            description: 'You will get NPR 500 off your first booking'
          }
        }
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Invalid referral code'
      });
    }
  } catch (error) {
    console.error('Validate referral error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error validating referral code'
    });
  }
});

module.exports = router;
