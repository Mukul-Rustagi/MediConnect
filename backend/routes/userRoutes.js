const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middleware/authenticate'); // Auth middleware to verify token

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', authenticate, userController.getUserProfile);

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', authenticate, userController.updateUserProfile);

module.exports = router;