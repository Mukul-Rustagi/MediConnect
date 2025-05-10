const dietService = require('../services/dietService'); // Importing dietService
const { sendErrorResponse, sendSuccessResponse } = require('../utils/responseHandler');

// Get diet recommendations
const getDietRecommendations = async (req, res) => {
  try {
    const userId = req.user.id; // User ID from authenticated request
    const result = await dietService.getDietRecommendations(userId);
    if (result.status === 'error') {
      return res.status(400).json(result);
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(sendErrorResponse('Error fetching diet recommendations.'));
  }
};

module.exports = {
  getDietRecommendations,
};
