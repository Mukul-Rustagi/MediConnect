const appointmentService = require('../services/appointmentService');
const redis = require('../config/redis');
const Appointment = require('../models/Appointment');
const { sendErrorResponse } = require('../utils/responseHandler');

// Book an appointment
const bookAppointment = async (req, res) => {
  try {
    const appointmentData = {
      ...req.body,
      userId: req.user._id, // Set from authenticated user
    };
    const result = await appointmentService.createAppointment(appointmentData);
    if (result.status === 'error') return res.status(400).json(result);

    await redis.del(`appointments:user:${appointmentData.userId}`);
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
    const cached = await redis.get(cacheKey);
    if (cached) return res.json(JSON.parse(cached));

    const result = await appointmentService.getAppointments(userId);
    if (result.status === 'error') return res.status(400).json(result);

    await redis.set(cacheKey, JSON.stringify(result), 'EX', 300);
    return res.json(result);
  } catch (err) {
    return res.status(500).json(sendErrorResponse('Failed to fetch appointments'));
  }
};

// Update an appointment
const updateAppointment = async (req, res) => {
  try {
    const { status } = req.body;
    const appointmentId = req.params.id;

    const result = await appointmentService.updateAppointmentStatus(appointmentId, status);
    if (result.status === 'error') return res.status(400).json(result);

    await redis.del(`appointments:user:${req.user._id}`);
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
      await redis.del(`appointments:user:${appointment.userId}`);
    }
    return res.json({ message: 'Appointment cancelled' });
  } catch (err) {
    return res.status(500).json(sendErrorResponse('Cancellation failed'));
  }
};

module.exports = {
  bookAppointment,
  getAppointmentsByUser,
  updateAppointment,
  cancelAppointment,
};