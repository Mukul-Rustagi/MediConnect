const express = require('express');
const router = express.Router();
const paypalController = require('../controllers/paypalController');
const { authenticateToken } = require('../middleware/auth');

// Create payment via PayPal
router.post('/create', authenticateToken, paypalController.createPayment);

// Execute payment after approval
router.post('/execute', authenticateToken, paypalController.executePayment);

module.exports = router; 