const { sendErrorResponse, sendSuccessResponse } = require('../utils/responseHandler');
const { getDietRecommendation } = require('../utils/aiDietProcessor'); // Ensure this is the correct method from the AI processor

// Fetch AI-powered diet recommendation based on user data
const getDietRecommendations = async (userData) => {
  try {
    const recommendations = await getDietRecommendation(userData); // Calling the AI-powered function
    return sendSuccessResponse(recommendations);
  } catch (error) {
    return sendErrorResponse(error.message);
  }
};

module.exports = {
  getDietRecommendations,
};
