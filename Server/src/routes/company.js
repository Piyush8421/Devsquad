const express = require('express');
const router = express.Router();

// @route GET /api/company
// @desc Get company information
// @access Public
router.get('/', async (req, res) => {
  try {
    const companyInfo = {
      name: "Kostra",
      description: "Your trusted platform for unique property rentals and unforgettable experiences",
      mission: "To connect travelers with authentic local experiences through unique accommodations",
      vision: "To be the world's most trusted community-driven hospitality platform",
      founded: "2023",
      headquarters: "Kathmandu, Nepal",
      team: [
        {
          name: "John Doe",
          position: "CEO & Founder",
          bio: "Passionate about creating unique travel experiences",
          image: "/team/john-doe.jpg"
        },
        {
          name: "Jane Smith",
          position: "CTO",
          bio: "Technology leader with 10+ years of experience",
          image: "/team/jane-smith.jpg"
        },
        {
          name: "Mike Johnson",
          position: "Head of Operations",
          bio: "Operations expert focused on seamless user experiences",
          image: "/team/mike-johnson.jpg"
        }
      ],
      values: [
        {
          title: "Trust & Safety",
          description: "We prioritize the safety and security of our community"
        },
        {
          title: "Authentic Experiences",
          description: "We believe in genuine connections and local experiences"
        },
        {
          title: "Sustainability",
          description: "We're committed to responsible and sustainable tourism"
        },
        {
          title: "Innovation",
          description: "We continuously improve our platform with cutting-edge technology"
        }
      ],
      stats: {
        totalProperties: 500,
        activeCities: 100,
        happyGuests: 1000000,
        trustedHosts: 2500
      },
      contact: {
        email: "hello@kostra.com",
        phone: "+977-1-4567890",
        address: "Kathmandu, Nepal"
      }
    };

    res.json({
      success: true,
      data: companyInfo
    });
  } catch (error) {
    console.error('Get company info error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting company information'
    });
  }
});

// @route GET /api/company/about
// @desc Get detailed about information
// @access Public
router.get('/about', async (req, res) => {
  try {
    const aboutInfo = {
      story: "Kostra was born from a simple idea: everyone should have access to unique, authentic travel experiences. Founded in 2023 in the heart of Nepal, we've grown from a small startup to a trusted platform connecting travelers with extraordinary accommodations worldwide.",
      milestones: [
        {
          year: "2023",
          title: "Company Founded",
          description: "Kostra was established in Kathmandu, Nepal"
        },
        {
          year: "2023",
          title: "First 100 Properties",
          description: "Reached our first milestone of 100 listed properties"
        },
        {
          year: "2024",
          title: "50+ Cities",
          description: "Expanded to over 50 cities across South Asia"
        },
        {
          year: "2024",
          title: "100,000 Happy Guests",
          description: "Celebrated serving our 100,000th guest"
        }
      ],
      awards: [
        {
          title: "Best Startup 2024",
          organization: "Nepal Tech Awards",
          year: "2024"
        },
        {
          title: "Innovation in Tourism",
          organization: "South Asia Tourism Board",
          year: "2024"
        }
      ]
    };

    res.json({
      success: true,
      data: aboutInfo
    });
  } catch (error) {
    console.error('Get about info error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting about information'
    });
  }
});

module.exports = router;
