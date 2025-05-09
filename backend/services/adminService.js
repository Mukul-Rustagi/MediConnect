// services/adminService.js
const User = require('../models/User');
const { sendErrorResponse, sendSuccessResponse } = require('../utils/responseHandler');

// Get all users (for admin)
const getAllUsers = async () => {
  try {
    const users = await User.find();
    return sendSuccessResponse(users);
  } catch (error) {
    return sendErrorResponse(error.message);
  }
};

// Delete a user
const deleteUser = async (userId) => {
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) throw new Error('User not found');
    return sendSuccessResponse('User deleted successfully');
  } catch (error) {
    return sendErrorResponse(error.message);
  }
};

// Update user role
const updateUserRole = async (userId, role) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, { role }, { new: true });
    if (!updatedUser) throw new Error('User not found');
    return sendSuccessResponse(updatedUser);
  } catch (error) {
    return sendErrorResponse(error.message);
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  updateUserRole,
};