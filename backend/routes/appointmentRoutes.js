const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const authenticate = require('../middleware/authenticate');
const authorizeRoles = require('../middleware/authorizeRoles');

// All appointment routes require authentication
router.use(authenticate);

// Book a new appointment
router.post('/', appointmentController.bookAppointment);

// Get all appointments for the logged-in user
router.get('/', appointmentController.getAppointmentsByUser);

// Get a specific appointment by ID
// Accessible to the user who booked it, or to admin/doctor
router.get('/:id', appointmentController.getAppointmentById);

// Update an appointment status (admin or doctor only)
router.put('/:id', authorizeRoles('admin', 'doctor'), appointmentController.updateAppointment);

// Cancel an appointment (user can cancel their own)
router.delete('/:id', appointmentController.cancelAppointment);

// Get all appointments for the logged-in doctor
router.get('/doctor/my-appointments', authorizeRoles('doctor','patient'), appointmentController.getAppointmentsByDoctor);

// Get upcoming appointments
router.get('/upcoming', appointmentController.getUpcomingAppointments);

// Get past appointments
router.get('/past', appointmentController.getPastAppointments);

module.exports = router;