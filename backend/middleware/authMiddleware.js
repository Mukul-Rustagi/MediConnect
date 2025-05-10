// Middleware to validate payment data
const validatePaymentData = (req, res, next) => {
    const { amount, paymentMethod, userId } = req.body;
    
    // Check for required fields
    if (!amount || !paymentMethod || !userId) {
      return res.status(400).json({
        status: 'error',
        message: 'Missing required payment data. Please provide amount, payment method, and user ID.',
      });
    }
    
    next();
  };
  
  module.exports = {
    validatePaymentData,
  };
  