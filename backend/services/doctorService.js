const Doctor = require('../models/Doctor');
const jwt = require('jsonwebtoken');
// const redis = require('../config/redis');
const bcrypt= require('bcrypt');
const { sendErrorResponse, sendSuccessResponse } = require('../utils/responseHandler');
const JWT_SECRET=process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '7d';

// Create a new doctor (MongoDB only, Redis cache logic commented)

const createDoctor = async (doctorData) => {
  const {firstName,lastName,gender,phoneNumber,specialization,experienceYears,clinicAddress,email,password,role}= doctorData;
  try {
    
    const existingDoctor = await Doctor.findOne({email });
        if (existingDoctor) {
          return sendErrorResponse('User with this email already exists.');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        
            // Create user
            const doctor = new Doctor({
              firstName,lastName,gender,phoneNumber,specialization,experienceYears,clinicAddress,email,password:hashedPassword,role
            });
            const genderMap = { M: "Male", F: "Female", O: "Other" };
            const payload = {
              id: doctor._id,
              email: email,
              role: role,
              gender: genderMap[gender] || gender
            };
            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
            doctor.token=token;
            await doctor.save();
    // Invalidate cache
    // await redis.del(cacheKeys.allDoctors());
    // await redis.del(cacheKeys.bySpecialization(doctor.specialization));

    return sendSuccessResponse({token,doctor}, 'Doctor created successfully');
  } catch (error) {
    return sendErrorResponse(error.message);
  }
};

// Get all doctors or by specialization (MongoDB only)
const getAllDoctors = async () => {
  // const cacheKey = specialization
  //   ? cacheKeys.bySpecialization(specialization)
  //   : cacheKeys.allDoctors();

  try {
    // Try cache first
    // const cachedData = await redis.get(cacheKey);
    // if (cachedData) {
    //   return sendSuccessResponse(JSON.parse(cachedData), 'Fetched from cache');
    // }

    // Fallback to MongoDB
    const doctors = await Doctor.find();

    // Set cache (expires after TTL)
    // await redis.set(cacheKey, JSON.stringify(doctors), 'EX', CACHE_TTL);

    return sendSuccessResponse(doctors, 'Fetched from database');
  } catch (error) {
    return sendErrorResponse(error.message);
  }
};

// Get doctor by ID (MongoDB only)
const getDoctorById = async (id) => {
  // const cacheKey = cacheKeys.byId(id);

  try {
    // const cachedData = await redis.get(cacheKey);
    // if (cachedData) {
    //   return sendSuccessResponse(JSON.parse(cachedData), 'Fetched from cache');
    // }

    const doctor = await Doctor.findById(id);
    if (!doctor) return sendErrorResponse('Doctor not found');

    // await redis.set(cacheKey, JSON.stringify(doctor), 'EX', CACHE_TTL);

    return sendSuccessResponse(doctor, 'Fetched from database');
  } catch (error) {
    return sendErrorResponse(error.message);
  }
};

// Update doctor (MongoDB only)
const updateDoctor = async (id, updateData) => {
  console.log("hello");
  try {
    const doctor = await Doctor.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!doctor) return sendErrorResponse('Doctor not found');

    // await redis.del(cacheKeys.byId(id));
    // await redis.del(cacheKeys.allDoctors());
    // await redis.del(cacheKeys.bySpecialization(doctor.specialization));

    return sendSuccessResponse(doctor, 'Doctor updated successfully');
  } catch (error) {
    return sendErrorResponse(error.message);
  }
};

// Delete doctor (MongoDB only)
const deleteDoctor = async (id) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(id);
    if (!doctor) return sendErrorResponse('Doctor not found');

    // await redis.del(cacheKeys.byId(id));
    // await redis.del(cacheKeys.allDoctors());
    // await redis.del(cacheKeys.bySpecialization(doctor.specialization));

    return sendSuccessResponse(null, 'Doctor deleted successfully');
  } catch (error) {
    return sendErrorResponse(error.message);
  }
};

module.exports = {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};
