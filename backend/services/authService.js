const User = require('../models/User');
const Doctor = require('../models/Doctor');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendErrorResponse, sendSuccessResponse } = require('../utils/responseHandler');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '7d'; // Or customize via env

// Register a new user
const register = async (userData) => {
  try {
    const { firstName,lastName,email,phone,gender,password,role } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendErrorResponse('User with this email already exists.');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create user
    const user = new User({
      firstName,lastName,email,phone,gender,password:hashedPassword,role
    });
    const payload = { id:user._id,email:email,role:role };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    user.token=token;
    await user.save();

    // Exclude password in response
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return sendSuccessResponse({ token, user: userWithoutPassword }, 'User registered successfully.');
  } catch (error) {
    return sendErrorResponse(error.message);
  }
};

// Login existing user
const login = async (email, password,role) => {
  // console.log("h");
  if(role==="Patient"){

    try {
    const user = await User.findOne({ email});
    if (!user) return sendErrorResponse('Invalid email or password.');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return sendErrorResponse('Invalid email or password.')

    // Generate JWT
    const payload = { id:user._id,email: email,role:role };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    user.token = token;
    await user.save();

    return sendSuccessResponse({ token }, 'Login successful.');
  } catch (error) {
    return sendErrorResponse(error.message);
  }
  }

  else if(role==="Doctor"){
    // console.log("h");
    try {
    const doctor = await Doctor.findOne({ email});
    if (!doctor) return sendErrorResponse('Invalid email or password.');

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) return sendErrorResponse('Invalid email or password.')

    // Generate 
    // console.log("heee");
    const payload = { id:doctor._id,email: email,role:role };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    doctor.token = token;
    await doctor.save();

    return sendSuccessResponse({ token }, 'Login successful.');
  } catch (error) {
    return sendErrorResponse(error.message);
  }
  }
};

module.exports = {
  register,
  login,
};