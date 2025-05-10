const express = require('express');
const { getUserProfile, updateUserProfile, uploadMeetingFiles } = require('../controllers/userController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

// GET - Get User Profile
router.get('/profile', authenticate, getUserProfile);

// PUT - Update User Profile with image upload
router.put('/profile', authenticate, updateUserProfile);

// POST - Upload multiple files during a doctor meeting
router.post('/meeting-files', authenticate, uploadMeetingFiles);

module.exports = router;
