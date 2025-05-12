const appointmentService = require('../services/appointmentService');
const redis = require('../config/redis');
const Appointment = require('../models/Appointment');
const { sendErrorResponse } = require('../utils/responseHandler');
const jwtDecode = require('jwt-decode');

// Book an appointment
const bookAppointment = async (req, res) => {
  try {
    const appointmentData = { ...req.body };
    const result = await appointmentService.createAppointment(appointmentData);
    if (result.status === 'error') return res.status(400).json(result);

    // Try to invalidate Redis cache
    try {
      await redis.del(`appointments:user:${appointmentData.userId}`);
    } catch (err) {
      console.warn('Redis delete failed, continuing with MongoDB only');
    }

    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json(sendErrorResponse('Booking failed'));
  }
};

// Get appointments for authenticated user
const getAppointmentsByUser = async (req, res) => {
  const userId = req.user._id;
  const cacheKey = `appointments:user:${userId}`;

  try {
    // Try Redis cache
    try {
      const cached = await redis.get(cacheKey);
      if (cached) return res.json(JSON.parse(cached));
    } catch (err) {
      console.warn('Redis get failed, fetching from MongoDB');
    }

    // Fallback to MongoDB
    const result = await appointmentService.getAppointments(userId);
    if (result.status === 'error') return res.status(400).json(result);

    // Try caching in Redis
    try {
      await redis.set(cacheKey, JSON.stringify(result), 'EX', 300);
    } catch (err) {
      console.warn('Redis set failed, continuing without caching');
    }

    return res.json(result);
  } catch (err) {
    return res.status(500).json(sendErrorResponse('Failed to fetch appointments'));
  }
};

// Get a specific appointment by ID
const getAppointmentById = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const result = await appointmentService.getAppointmentById(appointmentId);
    if (result.status === 'error') return res.status(404).json(result);

    return res.json(result);
  } catch (err) {
    return res.status(500).json(sendErrorResponse('Failed to fetch appointment'));
  }
};

// Update an appointment
const updateAppointment = async (req, res) => {
  try {
    const { status } = req.body;
    const appointmentId = req.params.id;

    const result = await appointmentService.updateAppointmentStatus(appointmentId, status);
    if (result.status === 'error') return res.status(400).json(result);

    try {
      await redis.del(`appointments:user:${req.user._id}`);
    } catch (err) {
      console.warn('Redis delete failed on update, continuing');
    }

    return res.json(result);
  } catch (err) {
    return res.status(500).json(sendErrorResponse('Update failed'));
  }
};

// Cancel an appointment
const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (appointment) {
      try {
        await redis.del(`appointments:user:${appointment.userId}`);
      } catch (err) {
        console.warn('Redis delete failed on cancel, continuing');
      }
    }
    return res.json({ message: 'Appointment cancelled' });
  } catch (err) {
    return res.status(500).json(sendErrorResponse('Cancellation failed'));
  }
};
const getAppointmentsByDoctor = async (req, res) => {
  try {
    const doctorId = req.user._id; // assuming doctor is authenticated
    const result = await appointmentService.getAppointmentsByDoctor(doctorId);
    if (result.status === 'error') return res.status(400).json(result);
    return res.json(result);
  } catch (err) {
    return res.status(500).json(sendErrorResponse('Failed to fetch doctor appointments'));
  }
};

// Get upcoming appointments for the logged-in user
const getUpcomingAppointments = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const decoded = jwtDecode(token);
    const userId = decoded.id;

    const appointments = await appointmentService.getUpcomingAppointments(userId);
    
    return res.status(200).json({
      success: true,
      data: appointments
    });
  } catch (error) {
    console.error('Error in getUpcomingAppointments:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch upcoming appointments'
    });
  }
};

// Get past appointments for the logged-in user
const getPastAppointments = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const decoded = jwtDecode(token);
    const userId = decoded.id;

    const appointments = await appointmentService.getPastAppointments(userId);
    
    return res.status(200).json({
      success: true,
      data: appointments
    });
  } catch (error) {
    console.error('Error in getPastAppointments:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch past appointments'
    });
  }
};

module.exports = {
  bookAppointment,
  getAppointmentsByUser,
  getAppointmentById,
  updateAppointment,
  cancelAppointment,
  getAppointmentsByDoctor,
  getUpcomingAppointments,
  getPastAppointments
};