const express = require('express');
const { generatePatientReport, getPatientReports, deleteReport } = require('../controllers/reportController');
const authenticate = require('../middleware/authenticate');
const authorizeRoles = require('../middleware/authorizeRoles');

const router = express.Router();

// POST - Generate Patient Report (Doctor)
router.post('/generate', authenticate, authorizeRoles('doctor'), generatePatientReport);

// GET - Get All Patient Reports (Admin or Doctor)
router.get('/all/:userId', authenticate, authorizeRoles('admin', 'doctor'), getPatientReports);

// DELETE - Delete a Patient Report (Admin or Doctor)
router.delete('/:id', authenticate, authorizeRoles('admin', 'doctor'), deleteReport);

module.exports = router;