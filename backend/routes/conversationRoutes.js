const express = require('express');
const { storeConversation } = require('../controllers/conversationController');
const authenticate = require('../middleware/authenticate');
const authorizeRoles = require('../middleware/authorizeRoles');

const router = express.Router();

// POST - Store doctor-patient conversation (Doctor or Patient)
router.post('/store', authenticate, authorizeRoles('doctor', 'patient'), storeConversation);

module.exports = router;
