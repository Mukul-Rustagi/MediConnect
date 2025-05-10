const express = require('express');
const { createPrescription } = require('../controllers/prescriptionController');
const authenticate = require('../middleware/authenticate');
const authorizeRoles = require('../middleware/authorizeRoles');

const router = express.Router();

// POST - Generate and store prescription (Doctor)
router.post('/generate', authenticate, authorizeRoles('doctor'), createPrescription);

module.exports = router;
