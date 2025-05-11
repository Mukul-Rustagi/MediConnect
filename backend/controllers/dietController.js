// controllers/dietController.js
const dietService = require("../services/dietService");
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../utils/responseHandler");

const getDietRecommendations = async (req, res) => {
  try {
    const userData = req.body;

    // Validate required fields
    const requiredFields = [
      "age",
      "gender",
      "height",
      "weight",
      "goal",
      "activityLevel",
      "dietPreference",
    ];
    const missingFields = requiredFields.filter((field) => !userData[field]);

    if (missingFields.length > 0) {
      return res
        .status(400)
        .json(
          sendErrorResponse(
            `Missing required fields: ${missingFields.join(", ")}`
          )
        );
    }

    const dietPlan = await dietService.getDietRecommendations(userData);
    return res
      .status(200)
      .json(sendSuccessResponse(dietPlan, "Diet plan generated successfully"));
  } catch (error) {
    console.error("Diet Controller Error:", error);
    return res
      .status(500)
      .json(
        sendErrorResponse(
          error.message || "Error generating diet recommendations"
        )
      );
  }
};

module.exports = {
  getDietRecommendations,
};
