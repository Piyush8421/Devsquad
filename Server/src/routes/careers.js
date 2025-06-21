const express = require('express');
const Joi = require('joi');
const db = require('../config/database');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// Validation schema for job application
const applicationSchema = Joi.object({
  jobId: Joi.number().integer().required(),
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  coverLetter: Joi.string().min(50).max(2000).required(),
  resumeUrl: Joi.string().uri().required(),
  linkedinUrl: Joi.string().uri().optional(),
  portfolioUrl: Joi.string().uri().optional()
});

// @route GET /api/careers
// @desc Get all available jobs
// @access Public
router.get('/', async (req, res) => {
  try {
    const { department, location, type } = req.query;

    // For demo purposes, return static job listings
    // In production, this would come from the database
    let jobs = [
      {
        id: 1,
        title: "Senior Frontend Developer",
        department: "Engineering",
        location: "Kathmandu, Nepal",
        type: "Full-time",
        experience: "3-5 years",
        description: "We're looking for a Senior Frontend Developer to join our engineering team and help build amazing user experiences.",
        requirements: [
          "3+ years of experience with React.js",
          "Strong knowledge of JavaScript/TypeScript",
          "Experience with modern CSS frameworks",
          "Knowledge of state management (Redux, Context API)",
          "Experience with testing frameworks"
        ],
        responsibilities: [
          "Develop and maintain frontend applications",
          "Collaborate with design and backend teams",
          "Write clean, maintainable code",
          "Participate in code reviews",
          "Optimize application performance"
        ],
        benefits: [
          "Competitive salary",
          "Health insurance",
          "Flexible working hours",
          "Remote work options",
          "Professional development budget"
        ],
        salary: "NPR 80,000 - 120,000",
        isActive: true,
        postedDate: "2024-06-15",
        applicationDeadline: "2024-07-15"
      },
      {
        id: 2,
        title: "Backend Developer",
        department: "Engineering",
        location: "Kathmandu, Nepal",
        type: "Full-time",
        experience: "2-4 years",
        description: "Join our backend team to build scalable and robust server-side applications that power our platform.",
        requirements: [
          "2+ years of experience with Node.js",
          "Strong knowledge of Express.js",
          "Experience with PostgreSQL or similar databases",
          "Knowledge of RESTful API design",
          "Experience with cloud platforms (AWS, GCP)"
        ],
        responsibilities: [
          "Design and develop backend APIs",
          "Database design and optimization",
          "Implement security best practices",
          "Monitor and maintain system performance",
          "Collaborate with frontend developers"
        ],
        benefits: [
          "Competitive salary",
          "Health insurance",
          "Flexible working hours",
          "Remote work options",
          "Professional development budget"
        ],
        salary: "NPR 70,000 - 100,000",
        isActive: true,
        postedDate: "2024-06-10",
        applicationDeadline: "2024-07-20"
      },
      {
        id: 3,
        title: "Product Manager",
        department: "Product",
        location: "Kathmandu, Nepal",
        type: "Full-time",
        experience: "3-6 years",
        description: "Lead product strategy and execution to deliver exceptional user experiences for our property rental platform.",
        requirements: [
          "3+ years of product management experience",
          "Experience in travel or hospitality industry preferred",
          "Strong analytical and problem-solving skills",
          "Excellent communication skills",
          "Experience with product analytics tools"
        ],
        responsibilities: [
          "Define product roadmap and strategy",
          "Work with cross-functional teams",
          "Analyze user feedback and market trends",
          "Define and track product metrics",
          "Coordinate product launches"
        ],
        benefits: [
          "Competitive salary",
          "Health insurance",
          "Equity participation",
          "Travel allowances",
          "Professional development budget"
        ],
        salary: "NPR 100,000 - 150,000",
        isActive: true,
        postedDate: "2024-06-05",
        applicationDeadline: "2024-07-25"
      },
      {
        id: 4,
        title: "UX/UI Designer",
        department: "Design",
        location: "Remote",
        type: "Full-time",
        experience: "2-4 years",
        description: "Create beautiful and intuitive user experiences that delight our users and drive business growth.",
        requirements: [
          "2+ years of UX/UI design experience",
          "Proficiency in Figma, Sketch, or similar tools",
          "Strong portfolio showcasing design process",
          "Knowledge of user research methods",
          "Understanding of front-end development"
        ],
        responsibilities: [
          "Design user interfaces for web and mobile",
          "Conduct user research and usability testing",
          "Create wireframes and prototypes",
          "Collaborate with developers and product managers",
          "Maintain design system and guidelines"
        ],
        benefits: [
          "Competitive salary",
          "Health insurance",
          "Creative tools subscription",
          "Remote work flexibility",
          "Conference attendance support"
        ],
        salary: "NPR 60,000 - 90,000",
        isActive: true,
        postedDate: "2024-06-12",
        applicationDeadline: "2024-07-30"
      }
    ];

    // Apply filters
    if (department) {
      jobs = jobs.filter(job => job.department.toLowerCase() === department.toLowerCase());
    }
    if (location) {
      jobs = jobs.filter(job => job.location.toLowerCase().includes(location.toLowerCase()));
    }
    if (type) {
      jobs = jobs.filter(job => job.type.toLowerCase() === type.toLowerCase());
    }

    // Only return active jobs
    jobs = jobs.filter(job => job.isActive);

    res.json({
      success: true,
      data: {
        jobs,
        totalJobs: jobs.length,
        departments: ["Engineering", "Product", "Design", "Marketing", "Operations"],
        locations: ["Kathmandu, Nepal", "Remote", "Pokhara, Nepal"],
        types: ["Full-time", "Part-time", "Contract", "Internship"]
      }
    });
  } catch (error) {
    console.error('Get careers error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting careers'
    });
  }
});

// @route GET /api/careers/:id
// @desc Get single job details
// @access Public
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // For demo purposes, find job by ID from static data
    // In production, this would query the database
    const jobs = [
      {
        id: 1,
        title: "Senior Frontend Developer",
        department: "Engineering",
        location: "Kathmandu, Nepal",
        type: "Full-time",
        experience: "3-5 years",
        description: "We're looking for a Senior Frontend Developer to join our engineering team and help build amazing user experiences.",
        requirements: [
          "3+ years of experience with React.js",
          "Strong knowledge of JavaScript/TypeScript",
          "Experience with modern CSS frameworks",
          "Knowledge of state management (Redux, Context API)",
          "Experience with testing frameworks"
        ],
        responsibilities: [
          "Develop and maintain frontend applications",
          "Collaborate with design and backend teams",
          "Write clean, maintainable code",
          "Participate in code reviews",
          "Optimize application performance"
        ],
        benefits: [
          "Competitive salary",
          "Health insurance",
          "Flexible working hours",
          "Remote work options",
          "Professional development budget"
        ],
        salary: "NPR 80,000 - 120,000",
        isActive: true,
        postedDate: "2024-06-15",
        applicationDeadline: "2024-07-15"
      }
      // Add other jobs here...
    ];

    const job = jobs.find(job => job.id === parseInt(id));

    if (!job || !job.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    res.json({
      success: true,
      data: { job }
    });
  } catch (error) {
    console.error('Get job error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting job details'
    });
  }
});

// @route POST /api/careers/apply
// @desc Apply for a job
// @access Public
router.post('/apply', async (req, res) => {
  try {
    const { error, value } = applicationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const {
      jobId,
      firstName,
      lastName,
      email,
      phone,
      coverLetter,
      resumeUrl,
      linkedinUrl,
      portfolioUrl
    } = value;

    // In production, you would:
    // 1. Check if job exists and is active
    // 2. Save application to database
    // 3. Send confirmation email to applicant
    // 4. Notify HR team

    // For demo purposes, just return success response
    const application = {
      id: Date.now(), // Generate temporary ID
      jobId,
      firstName,
      lastName,
      email,
      phone,
      coverLetter,
      resumeUrl,
      linkedinUrl,
      portfolioUrl,
      status: 'submitted',
      appliedAt: new Date().toISOString()
    };

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully! We will review your application and get back to you soon.',
      data: { application }
    });
  } catch (error) {
    console.error('Apply for job error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error submitting application'
    });
  }
});

// @route GET /api/careers/applications
// @desc Get all job applications (Admin only)
// @access Private/Admin
router.get('/admin/applications', adminAuth, async (req, res) => {
  try {
    const { page = 1, limit = 10, status, jobId } = req.query;
    
    // For demo purposes, return static data
    // In production, this would query the database
    let applications = [
      {
        id: 1,
        jobId: 1,
        jobTitle: "Senior Frontend Developer",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "+977-9800000000",
        status: "submitted",
        appliedAt: "2024-06-16T10:30:00Z"
      },
      {
        id: 2,
        jobId: 2,
        jobTitle: "Backend Developer",
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        phone: "+977-9800000001",
        status: "under_review",
        appliedAt: "2024-06-17T14:20:00Z"
      }
    ];

    // Apply filters
    if (status) {
      applications = applications.filter(app => app.status === status);
    }
    if (jobId) {
      applications = applications.filter(app => app.jobId === parseInt(jobId));
    }

    res.json({
      success: true,
      data: {
        applications,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(applications.length / limit),
          totalItems: applications.length
        }
      }
    });
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting applications'
    });
  }
});

module.exports = router;
