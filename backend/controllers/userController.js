// controllers/userController.js
const userService = require('../services/userService'); // Importing userService
const { sendErrorResponse, sendSuccessResponse } = require('../utils/responseHandler');

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // User ID from authenticated request
    const result = await userService.getUserProfile(userId);
    if (result.status === 'error') {
      return res.status(400).json(result);
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(sendErrorResponse('Error fetching user profile.'));
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const updatedData = req.body;
    const result = await userService.updateUserProfile(userId, updatedData);
    if (result.status === 'error') {
      return res.status(400).json(result);
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(sendErrorResponse('Error updating profile.'));
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
};