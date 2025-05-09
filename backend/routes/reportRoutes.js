// routes/reportRoutes.js
const express = require('express');
const { generatePatientReport, getPatientReports } = require('../controllers/reportController');
const authenticate = require('../middleware/authenticate');
const authorizeRoles = require('../middleware/authorizeRoles');

const router = express.Router();

// POST - Generate Patient Report (Doctor)
router.post('/generate', authenticate, authorizeRoles('doctor'), generatePatientReport);

// GET - Get All Patient Reports (Admin or Doctor)
router.get('/all', authenticate, authorizeRoles('admin', 'doctor'), getPatientReports);

module.exports = router;