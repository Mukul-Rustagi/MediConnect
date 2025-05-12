// Middleware to validate payment data
const validatePaymentData = (req, res, next) => {
  console.log("Validating payment data:", req.body);

  // Check if req.body exists
  if (!req.body) {
    return res.status(400).json({
      status: "error",
      message: "No request body provided.",
    });
  }

  const { amount, paymentMethod, userId } = req.body;

  // Check for required fields
  if (!amount || !paymentMethod || !userId) {
    return res.status(400).json({
      status: "error",
      message:
        "Missing required payment data. Please provide amount, payment method, and user ID.",
    });
  }

  console.log("Payment data validated successfully");
  next();
};

module.exports = {
  validatePaymentData,
};
