// controllers/authController.js
const authService = require("../services/authService");
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../utils/responseHandler");

// User registration
const registerUser = async (req, res) => {
  try {
    const userData = req.body;
    const result = await authService.register(userData);
    console.log(result);
    if (result.status === "error") {
      // console.log(res.json());
      return res.status(200).json(result);
    }
    return res.status(201).json(result);
  } catch (error) {
    return res
      .status(500)
      .json(sendErrorResponse("Error during user registration."));
  }
};

// User login
const loginUser = async (req, res) => {
  console.log("hello");
  try {
    const { email, password, role } = req.body;
    const result = await authService.login(email, password, role);
    console.log(result);
    if (result.status === "error") {
      return res.status(200).json(result);
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(sendErrorResponse("Error during user login."));
  }
};
const logoutUser = async (req, res) => {
  // You can optionally clear cookies if using cookie-based JWTs
  return res
    .status(200)
    .json(sendSuccessResponse(null, "Logged out successfully"));
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
