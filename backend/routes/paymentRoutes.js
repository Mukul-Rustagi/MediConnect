const express = require("express");
const { processPayment, getPaymentStatus } = require("../controllers/paymentController");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

// Test route
router.post("/test", (req, res) => {
  console.log("Test route - Request body:", req.body);
  res.status(200).json({ message: "Test successful", data: req.body });
});

// Payment routes
router.post("/payment", authenticate, processPayment);
router.get("/payment/status/:paymentId", authenticate, getPaymentStatus);

module.exports = router;
