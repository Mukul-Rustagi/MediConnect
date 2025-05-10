const otpService = require('../services/otpService');
const { sendErrorResponse } = require('../utils/responseHandler');

// Send OTP
const sendOtpToUser = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await otpService.sendOtp(email);
    if (result.status === 'error') {
      return res.status(400).json(result);
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(sendErrorResponse('Failed to send OTP'));
  }
};

// Verify OTP
const verifyOtpFromUser = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const result = await otpService.verifyOtp(email, otp);
    if (result.status === 'error') {
      return res.status(400).json(result);
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(sendErrorResponse('Failed to verify OTP'));
  }
};

module.exports = {
  sendOtpToUser,
  verifyOtpFromUser,
};