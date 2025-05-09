// routes/authRoutes.js
const express = require('express');
const { login, signup, sendOtp, verifyOtp } = require('../controllers/authController');
const authenticate = require('../middleware/authenticate');
const otpMiddleware = require('../middleware/otpMiddleware');

const router = express.Router();

// POST - Signup
router.post('/signup', signup);

// POST - Login
router.post('/login', login);

// POST - Send OTP
router.post('/otp/send', sendOtp);

// POST - Verify OTP
router.post('/otp/verify', otpMiddleware, verifyOtp);

module.exports = router;