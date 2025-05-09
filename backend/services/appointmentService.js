// services/appointmentService.js
const Appointment = require('../models/Appointment');
const { sendErrorResponse, sendSuccessResponse } = require('../utils/responseHandler');

// Create an appointment
const createAppointment = async (appointmentData) => {
  try {
    const appointment = await Appointment.create(appointmentData);
    return sendSuccessResponse(appointment);
  } catch (error) {
    return sendErrorResponse(error.message);
  }
};

// Get all appointments for a user
const getAppointments = async (userId) => {
  try {
    const appointments = await Appointment.find({ user: userId });
    return sendSuccessResponse(appointments);
  } catch (error) {
    return sendErrorResponse(error.message);
  }
};

// Update appointment status (e.g., from pending to completed)
const updateAppointmentStatus = async (appointmentId, status) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(appointmentId, { status }, { new: true });
    if (!appointment) throw new Error('Appointment not found');
    return sendSuccessResponse(appointment);
  } catch (error) {
    return sendErrorResponse(error.message);
  }
};

module.exports = {
  createAppointment,
  getAppointments,
  updateAppointmentStatus,
};