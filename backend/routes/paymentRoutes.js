// routes/paymentRoutes.js
const express = require('express');
const { makePayment, getPaymentStatus } = require('../controllers/paymentController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

// POST - Make Payment
router.post('/make', authenticate, makePayment);

// GET - Get Payment Status
router.get('/status/:id', authenticate, getPaymentStatus);

module.exports = router;