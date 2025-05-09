// routes/userRoutes.js
const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

// GET - Get User Profile
router.get('/profile', authenticate, getUserProfile);

// PUT - Update User Profile
router.put('/profile', authenticate, updateUserProfile);

module.exports = router;