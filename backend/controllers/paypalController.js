const paypal = require('../config/paypal');
const Appointment = require('../models/Appointment');

// Create payment via PayPal
exports.createPayment = async (req, res) => {
  try {
    const { totalAmount, appointmentId } = req.body;

    // Validate required fields
    if (!totalAmount || !appointmentId) {
      return res.status(400).json({
        success: false,
        message: 'Total amount and appointment ID are required'
      });
    }

    // Validate amount format
    const amount = parseFloat(totalAmount);
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid amount format'
      });
    }

    // Check if appointment exists
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    const payment = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal'
      },
      redirect_urls: {
        return_url: `${process.env.FRONTEND_URL}/payment/success`,
        cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`
      },
      transactions: [{
        amount: {
          total: amount.toFixed(2),
          currency: 'USD'
        },
        description: `Medical appointment payment for ${appointment.dateTime}`
      }]
    };

    paypal.payment.create(payment, (error, paymentResponse) => {
      if (error) {
        console.error('PayPal Error:', error);
        return res.status(500).json({
          success: false,
          message: 'Payment creation failed',
          error: error.response ? error.response.details : error.message
        });
      }

      // Find the approval URL
      const approvalUrl = paymentResponse.links.find(link => link.rel === 'approval_url');
      if (!approvalUrl) {
        return res.status(500).json({
          success: false,
          message: 'Approval URL not found in PayPal response'
        });
      }

      // Store payment ID in appointment
      appointment.paymentId = paymentResponse.id;
      await appointment.save();

      res.json({
        success: true,
        approvalUrl: approvalUrl.href,
        paymentId: paymentResponse.id
      });
    });
  } catch (error) {
    console.error('Payment Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Execute payment after approval
exports.executePayment = async (req, res) => {
  try {
    const { paymentId, payerId, appointmentId } = req.body;

    if (!paymentId || !payerId || !appointmentId) {
      return res.status(400).json({
        success: false,
        message: 'Payment ID, Payer ID, and Appointment ID are required'
      });
    }

    const executePayment = {
      payer_id: payerId
    };

    paypal.payment.execute(paymentId, executePayment, async (error, payment) => {
      if (error) {
        console.error('PayPal Execute Error:', error);
        return res.status(500).json({
          success: false,
          message: 'Payment execution failed',
          error: error.response ? error.response.details : error.message
        });
      }

      // Update appointment with payment status
      const appointment = await Appointment.findById(appointmentId);
      if (!appointment) {
        return res.status(404).json({
          success: false,
          message: 'Appointment not found'
        });
      }

      appointment.paymentStatus = 'completed';
      appointment.paymentDetails = {
        paymentId,
        payerId,
        amount: payment.transactions[0].amount.total,
        currency: payment.transactions[0].amount.currency,
        status: payment.state
      };
      await appointment.save();

      res.json({
        success: true,
        message: 'Payment completed successfully',
        payment
      });
    });
  } catch (error) {
    console.error('Payment Execution Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
}; 