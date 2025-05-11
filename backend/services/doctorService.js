const Doctor = require('../models/Doctor'); // MongoDB via Mongoose
const redis = require('../config/redis');   // Redis client
const { sendErrorResponse, sendSuccessResponse } = require('../utils/responseHandler');

const CACHE_TTL = 3600; // 1 hour (TTL for Redis cache)

// === Redis Cache Key Helpers ===
const cacheKeys = {
  allDoctors: () => 'doctors:all',
  bySpecialization: (specialization) => `doctors:specialization:${specialization}`,
  byId: (id) => `doctor:${id}`,
};

// === Create Doctor (MongoDB only, invalidate Redis cache) ===
const createDoctor = async (doctorData) => {
  try {
    const doctor = await Doctor.create(doctorData); // MongoDB write

    // Invalidate related Redis caches
    await redis.del(cacheKeys.allDoctors());
    await redis.del(cacheKeys.bySpecialization(doctor.specialization));

    return sendSuccessResponse(doctor, 'Doctor created successfully');
  } catch (error) {
    if (error.code === 11000) {
      return sendErrorResponse('Duplicate email or phone number');
    }
    return sendErrorResponse(error.message);
  }
};

// === Get All Doctors (Read MongoDB → Cache in Redis) ===
const getAllDoctors = async (specialization) => {
  const cacheKey = specialization
    ? cacheKeys.bySpecialization(specialization)
    : cacheKeys.allDoctors();

  try {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      return sendSuccessResponse(JSON.parse(cachedData));
    }

    // Not in cache → fetch from MongoDB
    const query = specialization ? { specialization } : {};
    const doctors = await Doctor.find(query).sort({ createdAt: -1 });

    // Cache the result
    await redis.set(cacheKey, JSON.stringify(doctors), 'EX', CACHE_TTL);

    return sendSuccessResponse(doctors);
  } catch (error) {
    return sendErrorResponse(error.message);
  }
};

// === Get Doctor By ID (Read MongoDB → Cache in Redis) ===
const getDoctorById = async (id) => {
  const cacheKey = cacheKeys.byId(id);

  try {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      return sendSuccessResponse(JSON.parse(cachedData));
    }

    const doctor = await Doctor.findById(id); // MongoDB read
    if (!doctor) return sendErrorResponse('Doctor not found');

    await redis.set(cacheKey, JSON.stringify(doctor), 'EX', CACHE_TTL);

    return sendSuccessResponse(doctor);
  } catch (error) {
    return sendErrorResponse(error.message);
  }
};

// === Update Doctor (Update MongoDB → Invalidate Redis) ===
const updateDoctor = async (id, updateData) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!doctor) return sendErrorResponse('Doctor not found');

    // Invalidate relevant Redis keys
    await redis.del(cacheKeys.byId(id));
    await redis.del(cacheKeys.allDoctors());
    await redis.del(cacheKeys.bySpecialization(doctor.specialization));

    return sendSuccessResponse(doctor, 'Doctor updated successfully');
  } catch (error) {
    return sendErrorResponse(error.message);
  }
};

// === Delete Doctor (Remove from MongoDB → Invalidate Redis) ===
const deleteDoctor = async (id) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(id);
    if (!doctor) return sendErrorResponse('Doctor not found');

    // Invalidate relevant Redis keys
    await redis.del(cacheKeys.byId(id));
    await redis.del(cacheKeys.allDoctors());
    await redis.del(cacheKeys.bySpecialization(doctor.specialization));

    return sendSuccessResponse(null, 'Doctor deleted successfully');
  } catch (error) {
    return sendErrorResponse(error.message);
  }
};

// === Exports ===
module.exports = {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};
