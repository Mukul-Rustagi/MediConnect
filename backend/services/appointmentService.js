const Appointment = require("../models/Appointment");
const User = require("../models/User");
const Doctor = require("../models/Doctor");
const Payment = require("../models/paymentModel");
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../utils/responseHandler");
const { sendAppointmentConfirmation } = require("../utils/emailService");
const mongoose = require("mongoose");

const createAppointment = async (appointmentData) => {
  try {
    const { userId, doctorId, date, time, paymentId } = appointmentData;

    // 1. Validate required fields
    if (!userId || !doctorId || !date || !time || !paymentId) {
      return sendErrorResponse(
        "Missing required appointment fields (userId, doctorId, date, time, paymentId)."
      );
    }

    // 2. Validate date format
    const dateTimeString = `${date}T${time}`; // e.g., 2025-10-05T14:30
    const dateTime = new Date(dateTimeString);
    if (isNaN(dateTime.getTime())) {
      return sendErrorResponse(
        "Invalid date or time format. Use YYYY-MM-DD for date and HH:mm for time."
      );
    }

    // 3. Check if payment exists and is completed
    const payment = await Payment.findById(paymentId);
    if (!payment || payment.status !== "completed") {
      return sendErrorResponse("Payment not found or not completed.");
    }

    // 4. Prevent duplicate appointment for same payment
    const existingAppointment = await Appointment.findOne({ paymentId });
    if (existingAppointment) {
      return sendErrorResponse("Appointment already created for this payment.");
    }

    // 5. Create appointment
    const appointment = await Appointment.create({
      userId,
      doctorId,
      dateTime,
      paymentId,
      status: "confirmed",
    });

    // 6. Fetch user and doctor for email
    const [user, doctor] = await Promise.all([
      User.findById(userId),
      Doctor.findById(doctorId),
    ]);
    if (!user || !doctor) throw new Error("Doctor or user not found");

    // 7. Send confirmation email
    const emailData = {
      ...appointment.toObject(),
      user: { name: user.name },
      doctor: { name: doctor.name },
      department: doctor.specialization,
    };

    sendAppointmentConfirmation(user.email, emailData).catch((err) =>
      console.error("Email sending failed:", err)
    );

    return sendSuccessResponse(appointment, "Appointment booked successfully.");
  } catch (error) {
    return sendErrorResponse("Failed to create appointment: " + error.message);
  }
};

const getAppointments = async (userId) => {
  // console.log("hello");
  try {
    console.log(userId);
    const appointments = await Appointment.find({ userId }).populate(
      "doctorId"
    );

    console.log(appointments);
    return sendSuccessResponse(appointments);
  } catch (error) {
    return sendErrorResponse(error.message);
  }
};

const updateAppointmentStatus = async (appointmentId, status) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true }
    );
    if (!appointment) throw new Error("Appointment not found");
    return sendSuccessResponse(appointment);
  } catch (error) {
    return sendErrorResponse(error.message);
  }
};

const getAppointmentById = async (appointmentId, role) => {
  console.log("helloo");
  console.log(appointmentId);
  try {
    let appointment;
    if (role == "Patient") {
      appointment = await Appointment.find({ userId: appointmentId }).populate(
        "doctorId"
      );
    } else if (role == "Doctor") {
      appointment = await Appointment.find({
        doctorId: appointmentId,
      }).populate("userId");
    }
    if (!appointment) {
      return sendErrorResponse("Appointment not found.");
    }
    return sendSuccessResponse(appointment);
  } catch (error) {
    return sendErrorResponse("Failed to fetch appointment: " + error.message);
  }
};

const getAppointmentsByDoctor = async (doctorId) => {
  try {
    const appointments = await Appointment.find({ doctorId }).populate(
      "userId"
    );
    return sendSuccessResponse(appointments);
  } catch (error) {
    return sendErrorResponse(
      "Failed to fetch doctor appointments: " + error.message
    );
  }
};

// Get upcoming appointments for a user
const getUpcomingAppointments = async (userId) => {
  try {
    const currentDate = new Date();

    const appointments = await Appointment.find({
      userId: new mongoose.Types.ObjectId(userId),
      dateTime: { $gt: currentDate },
      status: "completed",
    })
      .populate("doctorId", "name specialization")
      .sort({ dateTime: 1 });

    return appointments;
  } catch (error) {
    console.error("Error in getUpcomingAppointments:", error);
    throw new Error("Failed to fetch upcoming appointments");
  }
};

// Get past appointments for a user
const getPastAppointments = async (userId) => {
  try {
    const currentDate = new Date();

    const appointments = await Appointment.find({
      userId: new mongoose.Types.ObjectId(userId),
      dateTime: { $lte: currentDate },
      status: "completed",
    })
      .populate("doctorId", "name specialization")
      .sort({ dateTime: -1 });

    return appointments;
  } catch (error) {
    console.error("Error in getPastAppointments:", error);
    throw new Error("Failed to fetch past appointments");
  }
};

module.exports = {
  createAppointment,
  getAppointments,
  updateAppointmentStatus,
  getAppointmentById,
  getAppointmentsByDoctor,
  getUpcomingAppointments,
  getPastAppointments,
};
