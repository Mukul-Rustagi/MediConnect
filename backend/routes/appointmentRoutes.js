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

// Update an appointment status (admin or doctor only)
router.put('/:id', authorizeRoles('admin', 'doctor'), appointmentController.updateAppointment);

// Cancel an appointment (user can cancel their own)
router.delete('/:id', appointmentController.cancelAppointment);

module.exports = router;