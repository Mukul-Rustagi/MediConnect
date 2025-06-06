const express = require('express');
const { getUserProfile, updateUserProfile, uploadMeetingFiles } = require('../controllers/userController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();
const userController = require('../controllers/userController');

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', authenticate, userController.getUserProfile);
router.get('/profile/:id',authenticate,userController.getUserProfileById);
// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', authenticate, userController.updateUserProfile);

// POST - Upload multiple files during a doctor meeting
router.post('/meeting-files', authenticate, uploadMeetingFiles);

module.exports = router;
