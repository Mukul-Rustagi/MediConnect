// services/appointmentService.js
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const Doctor = require('../models/Doctor');
const { sendErrorResponse, sendSuccessResponse } = require('../utils/responseHandler');
const { sendAppointmentConfirmation } = require('../utils/emailService');

const Payment = require("../models/paymentModel"); // Import payment model

const createAppointment = async (appointmentData) => {
  try {
    const { userId, doctorId, date, time, paymentId } = appointmentData;

    // 1. Validate required data
    if (!userId || !doctorId || !date || !time || !paymentId) {
      return sendErrorResponse("Missing required appointment fields.");
    }

    // 2. Check if payment exists and is completed
    const payment = await Payment.findById(paymentId);
    if (!payment || payment.status !== "completed") {
      return sendErrorResponse("Payment not found or not completed.");
    }

    // 3. Prevent duplicate appointment for same payment
    const existingAppointment = await Appointment.findOne({ paymentId });
    if (existingAppointment) {
      return sendErrorResponse("Appointment already created for this payment.");
    }

    // 4. Create appointment
    const appointment = await Appointment.create({
      user: userId,
      doctor: doctorId,
      date,
      time,
      paymentId,
      status: "confirmed"
    });

    // 5. Fetch user and doctor for email
    const [user, doctor] = await Promise.all([
      User.findById(userId),
      Doctor.findById(doctorId),
    ]);
    if (!user || !doctor) throw new Error("Doctor or user not found");

    const emailData = {
      ...appointment.toObject(),
      user: { name: user.name },
      doctor: { name: doctor.name },
      department: doctor.specialization
    };

    sendAppointmentConfirmation(user.email, emailData)
      .catch(err => console.error("Email sending failed:", err));

    return sendSuccessResponse(appointment, "Appointment booked successfully.");
  } catch (error) {
    return sendErrorResponse("Failed to create appointment: " + error.message);
  }
};


// ... rest of the service code remains same

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