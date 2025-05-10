// middleware/otpMiddleware.js
const OTPService = require('../services/otpService'); // Service to send and verify OTP

const otpMiddleware = async (req, res, next) => {
  const { otp } = req.body;
  
  // Assuming the OTP is sent to user's phone/email
  const isValidOtp = await OTPService.verifyOtp(req.user.id, otp);
  
  if (!isValidOtp) {
    return res.status(400).json({ message: 'Invalid OTP.' });
  }

  next();
};

module.exports = otpMiddleware;
