// services/dietService.js
const { sendErrorResponse, sendSuccessResponse } = require('../utils/responseHandler');
const { getDietRecommendation } = require('../utils/aiDietProcessor');

const getDietRecommendations = async (userData) => {
  try {
    const recommendations = await getDietRecommendation(userData);
    return sendSuccessResponse(recommendations);
  } catch (error) {
    console.error('Diet Service Error:', error);
    return sendErrorResponse(error.message);
  }
};

module.exports = {
  getDietRecommendations,
};
