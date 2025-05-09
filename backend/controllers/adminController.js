// controllers/adminController.js
const adminService = require('../services/adminService'); // Importing adminService
const { sendErrorResponse, sendSuccessResponse } = require('../utils/responseHandler');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const result = await adminService.getAllUsers();
    if (result.status === 'error') {
      return res.status(400).json(result);
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(sendErrorResponse('Error fetching users.'));
  }
};

// Delete user by admin
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await adminService.deleteUser(userId);
    if (result.status === 'error') {
      return res.status(400).json(result);
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(sendErrorResponse('Error deleting user.'));
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
};