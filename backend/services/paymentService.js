// services/paymentService.js
const { sendErrorResponse, sendSuccessResponse } = require('../utils/responseHandler');
const { processPayment, getPaymentStatus } = require('../utils/paymentGateway');

// Make a payment
const makePayment = async (paymentData) => {
  try {
    const payment = await processPayment(paymentData);
    if (!payment) throw new Error('Payment failed');
    return sendSuccessResponse(payment);
  } catch (error) {
    return sendErrorResponse(error.message);
  }
};

// Get payment status
const getPaymentStatus = async (paymentId) => {
  try {
    const status = await getPaymentStatus(paymentId);
    return sendSuccessResponse(status);
  } catch (error) {
    return sendErrorResponse(error.message);
  }
};

module.exports = {
  makePayment,
  getPaymentStatus,
};