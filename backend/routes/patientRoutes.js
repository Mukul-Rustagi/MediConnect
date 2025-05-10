const express = require('express');
const router = express.Router();
const { getAllPatients } = require('../controllers/patientController');

// Example route: GET /patients
router.get('/', getAllPatients);

module.exports = router; 