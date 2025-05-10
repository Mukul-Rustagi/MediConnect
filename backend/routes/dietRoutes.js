const express = require('express');
const { getDietRecommendations } = require('../controllers/dietController'); // Ensure correct function name
const authenticate = require('../middleware/authenticate');
const authorizeRoles = require('../middleware/authorizeRoles');

const router = express.Router();

// GET - Get AI-Powered Diet Recommendations (Doctor or Patient)
router.get('/recommendations', authenticate, authorizeRoles('doctor', 'patient'), getDietRecommendations);

module.exports = router;
