// services/otpService.js
const OTP = require('../models/OTP');
const { sendErrorResponse, sendSuccessResponse } = require('../utils/responseHandler');
const { generateOTP } = require('../utils/otpGenerator');

// Send OTP to a user
const sendOtp = async (userEmail) => {
  try {
    const otp = generateOTP();
    await OTP.create({ userEmail, otp });
    // Send OTP to email (assuming email sending is implemented elsewhere)
    return sendSuccessResponse('OTP sent successfully');
  } catch (error) {
    return sendErrorResponse(error.message);
  }
};

// Verify OTP for user
const verifyOtp = async (userEmail, otp) => {
  try {
    const otpRecord = await OTP.findOne({ userEmail, otp });
    if (!otpRecord) throw new Error('Invalid OTP');
    await OTP.deleteOne({ userEmail, otp }); // Delete OTP after use
    return sendSuccessResponse('OTP verified successfully');
  } catch (error) {
    return sendErrorResponse(error.message);
  }
};

module.exports = {
  sendOtp,
  verifyOtp,
};