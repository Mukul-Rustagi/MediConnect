// services/userService.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendErrorResponse, sendSuccessResponse } = require('../utils/responseHandler');

// Fetch User Profile
const getUserProfile = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');
    return sendSuccessResponse(user);
  } catch (error) {
    return sendErrorResponse(error.message);
  }
};

// Update User Profile
const updateUserProfile = async (userId, userData) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });
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