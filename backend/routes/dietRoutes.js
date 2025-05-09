// routes/dietRoutes.js
const express = require('express');
const { getDietRecommendation } = require('../controllers/dietController');
const authenticate = require('../middleware/authenticate');
const authorizeRoles = require('../middleware/authorizeRoles');

const router = express.Router();

// GET - Get AI-Powered Diet Recommendations (Doctor or Patient)
router.get('/recommendations', authenticate, authorizeRoles('doctor', 'patient'), getDietRecommendation);

module.exports = router;