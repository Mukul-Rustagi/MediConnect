const express = require('express');
const router = express.Router();
const otpController = require('../controllers/otpController');

// @route   POST /api/otp/send
router.post('/send', otpController.sendOtpToUser);

// @route   POST /api/otp/verify
router.post('/verify', otpController.verifyOtpFromUser);

module.exports = router;