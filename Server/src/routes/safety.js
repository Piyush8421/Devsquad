const express = require('express');
const Joi = require('joi');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Validation schema for safety report
const safetyReportSchema = Joi.object({
  type: Joi.string().valid('safety_concern', 'inappropriate_behavior', 'property_issue', 'other').required(),
  propertyId: Joi.number().integer().optional(),
  bookingId: Joi.number().integer().optional(),
  subject: Joi.string().min(5).max(200).required(),
  description: Joi.string().min(20).max(2000).required(),
  priority: Joi.string().valid('low', 'medium', 'high', 'urgent').default('medium'),
  evidence: Joi.array().items(Joi.string().uri()).optional()
});

// @route GET /api/safety/guidelines
// @desc Get safety guidelines and policies
// @access Public
router.get('/guidelines', async (req, res) => {
  try {
    const safetyInfo = {
      title: "Safety & Trust at Kostra",
      description: "Your safety is our top priority. Learn about our safety measures and guidelines.",
      sections: [
        {
          title: "Before You Book",
          guidelines: [
            "Read property reviews and ratings carefully",
            "Verify host identity through profile verification",
            "Communicate only through Kostra platform",
            "Check property photos and amenities thoroughly",
            "Review cancellation policies before booking"
          ]
        },
        {
          title: "During Your Stay",
          guidelines: [
            "Keep emergency contact numbers handy",
            "Respect property rules and local laws",
            "Report any safety concerns immediately",
            "Document any property damage or issues",
            "Maintain communication with the host through our platform"
          ]
        },
        {
          title: "For Hosts",
          guidelines: [
            "Provide accurate property descriptions and photos",
            "Ensure property meets safety standards",
            "Install smoke detectors and safety equipment",
            "Provide clear check-in instructions",
            "Respond promptly to guest concerns"
          ]
        },
        {
          title: "Trust & Safety Features",
          features: [
            {
              name: "Identity Verification",
              description: "All users verify their identity through government ID and phone number"
            },
            {
              name: "Secure Payments",
              description: "All payments are processed securely through our platform"
            },
            {
              name: "24/7 Support",
              description: "Our safety team is available around the clock for urgent matters"
            },
            {
              name: "Host Guarantee",
              description: "Protection for hosts against property damage by guests"
            },
            {
              name: "Guest Refund Policy",
              description: "Fair refund policies to protect guest interests"
            }
          ]
        }
      ],
      emergencyContacts: {
        kostraSupport: "+977-1-4567890",
        police: "100",
        fire: "101",
        ambulance: "102",
        touristHelpline: "1144"
      },
      reportingProcess: [
        {
          step: 1,
          title: "Document the Issue",
          description: "Take photos/videos if safe to do so and note important details"
        },
        {
          step: 2,
          title: "Report Immediately",
          description: "Contact our safety team through the platform or emergency hotline"
        },
        {
          step: 3,
          title: "Follow Up",
          description: "Provide additional information as requested by our safety team"
        },
        {
          step: 4,
          title: "Resolution",
          description: "We investigate and take appropriate action to resolve the issue"
        }
      ]
    };

    res.json({
      success: true,
      data: safetyInfo
    });
  } catch (error) {
    console.error('Get safety guidelines error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting safety guidelines'
    });
  }
});

// @route POST /api/safety/report
// @desc Report a safety concern
// @access Private
router.post('/report', auth, async (req, res) => {
  try {
    const { error, value } = safetyReportSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const {
      type,
      propertyId,
      bookingId,
      subject,
      description,
      priority,
      evidence
    } = value;

    // In production, save to database and trigger appropriate workflows
    const report = {
      id: Date.now(),
      reporterId: req.user.id,
      reporterName: `${req.user.first_name} ${req.user.last_name}`,
      reporterEmail: req.user.email,
      type,
      propertyId,
      bookingId,
      subject,
      description,
      priority,
      evidence: evidence || [],
      status: 'submitted',
      createdAt: new Date().toISOString(),
      caseNumber: `SF${Date.now().toString().slice(-8)}`
    };

    // In production, you would:
    // 1. Save report to database
    // 2. Send immediate acknowledgment email to reporter
    // 3. Alert safety team based on priority level
    // 4. If urgent, trigger immediate response protocol

    res.status(201).json({
      success: true,
      message: 'Safety report submitted successfully. Our team will investigate and respond within 24 hours.',
      data: {
        report: {
          id: report.id,
          caseNumber: report.caseNumber,
          status: report.status,
          priority: report.priority,
          createdAt: report.createdAt
        }
      }
    });
  } catch (error) {
    console.error('Submit safety report error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error submitting safety report'
    });
  }
});

// @route GET /api/safety/my-reports
// @desc Get user's safety reports
// @access Private
router.get('/my-reports', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    
    // In production, fetch from database
    let reports = [
      {
        id: 1,
        caseNumber: "SF12345678",
        type: "property_issue",
        subject: "Broken lock on front door",
        status: "resolved",
        priority: "medium",
        createdAt: "2024-06-15T10:30:00Z",
        resolvedAt: "2024-06-16T14:20:00Z",
        response: "Issue has been fixed by the host. New lock installed."
      },
      {
        id: 2,
        caseNumber: "SF12345679",
        type: "safety_concern",
        subject: "Suspicious activity in neighborhood",
        status: "investigating",
        priority: "high",
        createdAt: "2024-06-18T16:45:00Z",
        resolvedAt: null,
        response: null
      }
    ];

    // Apply status filter
    if (status) {
      reports = reports.filter(report => report.status === status);
    }

    const offset = (page - 1) * limit;
    const paginatedReports = reports.slice(offset, offset + limit);

    res.json({
      success: true,
      data: {
        reports: paginatedReports,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(reports.length / limit),
          totalItems: reports.length
        }
      }
    });
  } catch (error) {
    console.error('Get safety reports error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting safety reports'
    });
  }
});

// @route GET /api/safety/report/:caseNumber
// @desc Get specific safety report by case number
// @access Private
router.get('/report/:caseNumber', auth, async (req, res) => {
  try {
    const { caseNumber } = req.params;

    // In production, fetch from database
    const report = {
      id: 1,
      caseNumber: "SF12345678",
      type: "property_issue",
      subject: "Broken lock on front door",
      description: "The front door lock is completely broken and cannot be locked from inside or outside. This is a serious security concern.",
      status: "resolved",
      priority: "medium",
      evidence: [
        "https://example.com/evidence/photo1.jpg",
        "https://example.com/evidence/photo2.jpg"
      ],
      createdAt: "2024-06-15T10:30:00Z",
      resolvedAt: "2024-06-16T14:20:00Z",
      response: "Issue has been fixed by the host. New lock installed and tested.",
      assignedAgent: "Sarah Johnson",
      updates: [
        {
          timestamp: "2024-06-15T10:30:00Z",
          status: "submitted",
          message: "Report submitted and case created"
        },
        {
          timestamp: "2024-06-15T11:00:00Z",
          status: "investigating",
          message: "Case assigned to safety agent. Host contacted."
        },
        {
          timestamp: "2024-06-16T14:20:00Z",
          status: "resolved",
          message: "Host has replaced the lock. Issue resolved."
        }
      ]
    };

    if (report.caseNumber !== caseNumber) {
      return res.status(404).json({
        success: false,
        message: 'Safety report not found'
      });
    }

    res.json({
      success: true,
      data: { report }
    });
  } catch (error) {
    console.error('Get safety report error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting safety report'
    });
  }
});

// @route GET /api/safety/admin/reports
// @desc Get all safety reports (Admin only)
// @access Private/Admin
router.get('/admin/reports', adminAuth, async (req, res) => {
  try {
    const { page = 1, limit = 10, status, priority, type } = req.query;
    
    // In production, fetch from database with filters
    let reports = [
      {
        id: 1,
        caseNumber: "SF12345678",
        reporterName: "John Doe",
        reporterEmail: "john@example.com",
        type: "property_issue",
        subject: "Broken lock on front door",
        status: "resolved",
        priority: "medium",
        createdAt: "2024-06-15T10:30:00Z",
        assignedAgent: "Sarah Johnson"
      },
      {
        id: 2,
        caseNumber: "SF12345679",
        reporterName: "Jane Smith",
        reporterEmail: "jane@example.com",
        type: "safety_concern",
        subject: "Suspicious activity in neighborhood",
        status: "investigating",
        priority: "high",
        createdAt: "2024-06-18T16:45:00Z",
        assignedAgent: "Mike Wilson"
      }
    ];

    // Apply filters
    if (status) reports = reports.filter(r => r.status === status);
    if (priority) reports = reports.filter(r => r.priority === priority);
    if (type) reports = reports.filter(r => r.type === type);

    const offset = (page - 1) * limit;
    const paginatedReports = reports.slice(offset, offset + limit);

    res.json({
      success: true,
      data: {
        reports: paginatedReports,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(reports.length / limit),
          totalItems: reports.length
        },
        stats: {
          total: reports.length,
          byStatus: {
            submitted: reports.filter(r => r.status === 'submitted').length,
            investigating: reports.filter(r => r.status === 'investigating').length,
            resolved: reports.filter(r => r.status === 'resolved').length,
            closed: reports.filter(r => r.status === 'closed').length
          },
          byPriority: {
            low: reports.filter(r => r.priority === 'low').length,
            medium: reports.filter(r => r.priority === 'medium').length,
            high: reports.filter(r => r.priority === 'high').length,
            urgent: reports.filter(r => r.priority === 'urgent').length
          }
        }
      }
    });
  } catch (error) {
    console.error('Get admin safety reports error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting safety reports'
    });
  }
});

module.exports = router;
