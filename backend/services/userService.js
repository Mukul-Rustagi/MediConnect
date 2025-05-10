const User = require('../models/User');
const { sendErrorResponse, sendSuccessResponse } = require('../utils/responseHandler');

// Fetch User Profile
const getUserProfile = async (userId) => {
  try {
    const user = await User.findById(userId).select('-password -otp'); // Exclude sensitive data
    if (!user) throw new Error('User not found');
    return sendSuccessResponse(user);
  } catch (error) {
    return sendErrorResponse(error.message);
  }
};

// Update User Profile
const updateUserProfile = async (userId, userData) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true }).select('-password -otp');
    if (!updatedUser) throw new Error('User update failed');
    return sendSuccessResponse(updatedUser);
  } catch (error) {
    return sendErrorResponse(error.message);
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
};