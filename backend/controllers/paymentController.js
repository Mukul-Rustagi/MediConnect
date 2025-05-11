const paymentService = require("../services/paymentService"); // Importing paymentService
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../utils/responseHandler");

// Process payment
const processPayment = async (req, res) => {
  try {
    const paymentData = req.body; // Payment data from request body

    // Ensure req.body is not undefined
    if (!paymentData) {
      return res
        .status(400)
        .json(sendErrorResponse("No payment data provided in request body."));
    }

    const result = await paymentService.makePayment(paymentData); // Call to service layer
    if (result.status === "error") {
      return res.status(400).json(result); // Return error if payment fails
    }
    return res.status(201).json(result); // Return success if payment is successful
  } catch (error) {
    console.error("Controller Error:", error);
    return res
      .status(500)
      .json(sendErrorResponse("Error processing payment: " + error.message)); // Generic server error
  }
};

// Get payment status
const getPaymentStatus = async (req, res) => {
  try {
    const paymentId = req.params.paymentId; // Get payment ID from URL parameter

    if (!paymentId) {
      return res.status(400).json(sendErrorResponse("Payment ID is required."));
    }

    const result = await paymentService.getPaymentStatus(paymentId); // Call to service layer to get status
    if (result.status === "error") {
      return res.status(404).json(result); // Return error if status fetch fails
    }
    return res.status(200).json(result); // Return success if status fetch is successful
  } catch (error) {
    console.error("Controller Error:", error);
    return res
      .status(500)
      .json(
        sendErrorResponse("Error fetching payment status: " + error.message)
      ); // Generic server error
  }
};

module.exports = {
  processPayment,
  getPaymentStatus,
};
