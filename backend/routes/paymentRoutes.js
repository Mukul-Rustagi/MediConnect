const express = require("express");
const paymentController = require("../controllers/paymentController");
const authenticate = require("../middleware/authenticate"); // Import authenticate middleware
const { validatePaymentData } = require("../middleware/authMiddleware"); // Assuming you still have the validatePaymentData middleware

const router = express.Router();

// Test route to check if body parsing is working
router.post("/test", (req, res) => {
  console.log("Test route - Request body:", req.body);
  res.status(200).json({
    message: "Test route successful",
    receivedData: req.body,
  });
});

// POST route for making payments with authentication and validation middleware
router.post(
  "/",
  authenticate,
  validatePaymentData,
  paymentController.processPayment
);

// GET route for fetching payment status with authentication middleware
router.get(
  "/status/:paymentId",
  authenticate,
  paymentController.getPaymentStatus
);

module.exports = router;
