const userService = require('../services/userService');
const { sendErrorResponse, sendSuccessResponse } = require('../utils/responseHandler');
const upload = require('../middleware/upload'); // Multer upload middleware

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from auth middleware
    const result = await userService.getUserProfile(userId);

    if (result.status === 'error') {
      return res.status(404).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(sendErrorResponse('Error fetching user profile.'));
  }
};

// Update User Profile with image upload
const updateUserProfile = [
  upload.single('profilePicture'), // Handle profile picture upload
  async (req, res) => {
    try {
      const userId = req.user.id;
      const updatedData = req.body;

      if (req.file) {
        updatedData.profilePicture = `/uploads/profile_pictures/${req.file.filename}`;
      }

      const result = await userService.updateUserProfile(userId, updatedData);

      if (result.status === 'error') {
        return res.status(400).json(result);
      }

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json(sendErrorResponse('Error updating profile.'));
    }
  }
];

// Upload Multiple Files for Meeting (e.g., files and images)
const uploadMeetingFiles = [
  upload.array('files', 5), // Accept up to 5 files
  async (req, res) => {
    try {
      const userId = req.user.id;
      const doctorId = req.body.doctorId;

      if (!doctorId) {
        return res.status(400).json(sendErrorResponse('Doctor ID is required.'));
      }

      const files = req.files.map(file => `/uploads/doctor_meeting_files/${file.filename}`);

      const result = await userService.saveMeetingFiles(userId, doctorId, files);

      if (result.status === 'error') {
        return res.status(400).json(result);
      }

      return res.status(200).json({ message: 'Files uploaded successfully', files });
    } catch (error) {
      return res.status(500).json(sendErrorResponse('Error uploading meeting files.'));
    }
  }
];

module.exports = {
  getUserProfile,
  updateUserProfile,
  uploadMeetingFiles
};
