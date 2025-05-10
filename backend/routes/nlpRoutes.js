const express = require('express');
const { storeConversationController, generatePrescriptionController } = require('../controllers/nlpController');
const authenticate = require('../middleware/authenticate');
const authorizeRoles = require('../middleware/authorizeRoles');

const router = express.Router();

// POST - Store doctor-patient conversation as PDF (Doctor only)
router.post('/store-conversation', authenticate, authorizeRoles('doctor'), storeConversationController);

// POST - Generate prescription using NLP (Doctor only)
router.post('/generate-prescription', authenticate, authorizeRoles('doctor'), generatePrescriptionController);

module.exports = router;
