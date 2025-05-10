const paymentService = require('../services/paymentService');
const { sendErrorResponse, sendSuccessResponse } = require('../utils/responseHandler');

// Process payment
const processPayment = async (req, res) => {
  try {
    const paymentData = req.body;
    const result = await paymentService.makePayment(paymentData);

    if (result.status === 'error') {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json(sendErrorResponse('Error processing payment.'));
  }
};

// Get payment status
const getPaymentStatus = async (req, res) => {
  try {
    const paymentId = req.params.paymentId;
    const result = await paymentService.getPaymentStatus(paymentId);

    if (result.status === 'error') {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json(sendErrorResponse('Error fetching payment status.'));
  }
};

module.exports = {
  processPayment,
  getPaymentStatus
};
