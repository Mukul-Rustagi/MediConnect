const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendErrorResponse, sendSuccessResponse } = require('../utils/responseHandler');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '7d'; // Or customize via env

// Register a new user
const register = async (userData) => {
  try {
    const { username, email, password, phoneNumber } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendErrorResponse('User with this email already exists.');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      username,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    await user.save();

    // Exclude password in response
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return sendSuccessResponse(userWithoutPassword, 'User registered successfully.');
  } catch (error) {
    return sendErrorResponse(error.message);
  }
};

// Login existing user
const login = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) return sendErrorResponse('Invalid email or password.');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return sendErrorResponse('Invalid email or password.');

    // Generate JWT
    const payload = { id: user._id, role: user.role };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return sendSuccessResponse({ token, user: userWithoutPassword }, 'Login successful.');
  } catch (error) {
    return sendErrorResponse(error.message);
  }
};

module.exports = {
  register,
  login,
};