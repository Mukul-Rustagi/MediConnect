// services/dietService.js
const { sendErrorResponse, sendSuccessResponse } = require('../utils/responseHandler');
const { getDietRecommendation } = require('../utils/aiDietProcessor');

// Fetch AI-powered diet recommendation based on user data
const getDietRecommendations = async (userData) => {
  try {
    const recommendations = await getDietRecommendation(userData);
    return sendSuccessResponse(recommendations);
  } catch (error) {
    return sendErrorResponse(error.message);
  }
};

module.exports = {
  getDietRecommendations,
};