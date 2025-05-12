// controllers/dietController.js
const dietService = require('../services/dietService');
const { sendErrorResponse, sendSuccessResponse } = require('../utils/responseHandler');

const getDietRecommendations = async (req, res) => {
  try {
    const userData = req.body; // Get user data from request body
    if (!userData || Object.keys(userData).length === 0) {
      return res.status(400).json(sendErrorResponse('User data is required for diet recommendation.'));
    }

    const result = await dietService.getDietRecommendations(userData);

    if (result.status === 'error') {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error('Controller Error:', error);
    return res.status(500).json(sendErrorResponse('Error fetching diet recommendations.'));
  }
};

module.exports = {
  getDietRecommendations,
};
