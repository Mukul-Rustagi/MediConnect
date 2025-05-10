const express = require('express');
const { createConsultation, getConsultation, updateConsultation, deleteConsultation } = require('../controllers/consultationController');
const authenticate = require('../middleware/authenticate');
const authorizeRoles = require('../middleware/authorizeRoles');

const router = express.Router();

// POST - Create Consultation (Doctor & Patient)
router.post('/start', authenticate, authorizeRoles('doctor', 'patient'), createConsultation);

// POST - End Consultation (Doctor)
router.post('/end', authenticate, authorizeRoles('doctor'), updateConsultation); // Assuming updateConsultation is used for ending

// GET - Get Consultation Details by ID
router.get('/details/:id', authenticate, getConsultation);

// DELETE - Delete Consultation (Doctor or Admin)
router.delete('/:id', authenticate, authorizeRoles('doctor', 'admin'), deleteConsultation);

module.exports = router;