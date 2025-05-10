// routes/dietRoutes.js
const express = require('express');
const { getDietRecommendations } = require('../controllers/dietController');
const authenticate = require('../middleware/authenticate');
const authorizeRoles = require('../middleware/authorizeRoles');

const router = express.Router();

// Change from GET to POST
router.post(
  '/recommendations',
  authenticate,
  authorizeRoles('doctor', 'patient'),
  getDietRecommendations
);

module.exports = router;
