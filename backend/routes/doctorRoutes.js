const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const authenticate = require('../middleware/authenticate');
const authorizeRoles = require('../middleware/authorizeRoles');

// Admin-only routes

// router.use(authorizeRoles('doctor'));

router.post('/', doctorController.createDoctor);
router.get('/', authenticate,doctorController.getAllDoctors);
router.get('/:id', authenticate,doctorController.getDoctorById);
router.put('/:id', authenticate,doctorController.updateDoctor);
router.delete('/:id', authenticate,doctorController.deleteDoctor);

module.exports = router;