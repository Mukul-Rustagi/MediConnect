const Payment = require("../models/paymentModel");
const { sendErrorResponse, sendSuccessResponse } = require("../utils/responseHandler");

const makePayment = async (paymentData) => {
  try {
    const { userId, amount, paymentMethod } = paymentData;

    if (!userId || !amount || !paymentMethod) {
      return sendErrorResponse("Missing required payment fields: userId, amount, or paymentMethod.");
    }

    const payment = new Payment({
      userId,
      totalAmount: amount,
      paymentMethod,
      status: "completed",
      date: new Date(),
    });

    await payment.save();

    return sendSuccessResponse("Payment processed successfully.", payment);
  } catch (error) {
    console.error("PaymentService Error:", error);
    return sendErrorResponse("An error occurred while processing the payment.", error.message);
  }
};

const getPaymentStatus = async (paymentId) => {
  try {
    const payment = await Payment.findById(paymentId);

    if (!payment) {
      return sendErrorResponse("Payment not found.");
    }

    return sendSuccessResponse("Payment found.", {
      status: payment.status,
      date: payment.date,
    });
  } catch (error) {
    console.error("GetStatus Error:", error);
    return sendErrorResponse("Failed to fetch payment status.", error.message);
  }
};

module.exports = {
  makePayment,
  getPaymentStatus,
};
