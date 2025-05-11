const Doctor = require('../models/Doctor');
// const redis = require('../config/redis');
const { sendErrorResponse, sendSuccessResponse } = require('../utils/responseHandler');

// const CACHE_TTL = 3600; // 1 hour

// Cache key helpers
// const cacheKeys = {
//   allDoctors: () => 'doctors:all',
//   bySpecialization: (specialization) => `doctors:specialization:${specialization}`,
//   byId: (id) => `doctor:${id}`,
// };

// Create a new doctor (MongoDB only, Redis cache logic commented)
const createDoctor = async (doctorData) => {
  try {
    const doctor = await Doctor.create(doctorData);

    // Invalidate cache
    // await redis.del(cacheKeys.allDoctors());
    // await redis.del(cacheKeys.bySpecialization(doctor.specialization));

    return sendSuccessResponse(doctor, 'Doctor created successfully');
  } catch (error) {
    if (error.code === 11000) {
      return sendErrorResponse('Duplicate email or phone number');
    }
    return sendErrorResponse(error.message);
  }
};

// Get all doctors or by specialization (MongoDB only)
const getAllDoctors = async (specialization) => {
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
    const query = specialization ? { specialization } : {};
    const doctors = await Doctor.find(query).sort({ createdAt: -1 });

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
