// services/paymentService.js
const Payment = require("../models/paymentModel");
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../utils/responseHandler");
const {
  getPaymentStatus: checkPaymentStatus,
} = require("../utils/paymentGateway");

// Make a payment
const makePayment = async (paymentData) => {
  try {
    console.log("Incoming Payment Payload:", paymentData);
    const { userId, amount, paymentMethod } = paymentData;

    if (!userId || !amount || !paymentMethod) {
      return {
        status: "error",
        message:
          "Missing required payment data. Please provide amount, payment method, and user ID.",
      };
    }

    const payment = new Payment({
      userId,
      totalAmount: amount, // Map amount to totalAmount for the database
      paymentMethod,
      status: "completed", // Simulate success for now
      date: new Date(),
    });

    await payment.save();

    return {
      status: "success",
      message: "Payment processed successfully.",
      data: payment,
    };
  } catch (error) {
    console.error("Payment Processing Error:", error);
    return {
      status: "error",
      message: "An error occurred while processing the payment.",
      error: error.message,
    };
  }
};

// Get payment status (optional)
const getPaymentStatus = async (paymentId) => {
  try {
    const payment = await Payment.findById(paymentId);

    if (!payment) {
      return {
        status: "error",
        message: "Payment not found",
      };
    }

    return {
      status: "success",
      data: { status: payment.status, date: payment.date },
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to fetch payment status.",
      error: error.message,
    };
  }
};

module.exports = {
  makePayment,
  getPaymentStatus,
};
