// routes/consultationRoutes.js
const express = require('express');
const { startConsultation, endConsultation, getConsultationDetails } = require('../controllers/consultationController');
const authenticate = require('../middleware/authenticate');
const authorizeRoles = require('../middleware/authorizeRoles');

const router = express.Router();

// POST - Start Consultation (Doctor & Patient)
router.post('/start', authenticate, authorizeRoles('doctor', 'patient'), startConsultation);

// POST - End Consultation (Doctor)
router.post('/end', authenticate, authorizeRoles('doctor'), endConsultation);

// GET - Get Consultation Details
router.get('/details/:id', authenticate, getConsultationDetails);

module.exports = router;