// routes/appointmentRoutes.js
const express = require('express');
const { createAppointment, getAppointments, updateAppointmentStatus } = require('../controllers/appointmentController');
const authenticate = require('../middleware/authenticate');
const authorizeRoles = require('../middleware/authorizeRoles');

const router = express.Router();

// POST - Create Appointment
router.post('/create', authenticate, createAppointment);

// GET - Get Appointments (Doctor or Patient)
router.get('/appointments', authenticate, getAppointments);

// PUT - Update Appointment Status (Doctor)
router.put('/appointment/:id/status', authenticate, authorizeRoles('doctor'), updateAppointmentStatus);

module.exports = router;