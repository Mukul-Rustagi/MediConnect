const paypal = require('paypal-rest-sdk');
require('dotenv').config();

paypal.configure({
  mode: 'sandbox', // or 'live'
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET
});

// Create payment
const makePayment = (paymentData) => {
  return new Promise((resolve, reject) => {
    const totalAmount = paymentData.totalAmount;
    if (!totalAmount) {
      return resolve({ status: 'error', message: 'Total amount is required' });
    }

    const payment = {
      intent: 'sale',
      payer: { payment_method: 'paypal' },
      redirect_urls: {
        return_url: 'http://localhost:5060/api/paypal/success',
        cancel_url: 'http://localhost:5060/api/paypal/cancel'
      },
      transactions: [{
        amount: {
          total: totalAmount.toString(),
          currency: 'USD'
        },
        description: 'Travel booking payment'
      }]
    };

    paypal.payment.create(payment, (error, paymentResponse) => {
      if (error) {
        console.error('PayPal Error:', error);
        return resolve({
          status: 'error',
          message: 'Payment creation failed',
          details: error.response ? error.response.details : error
        });
      }

      const approvalUrl = paymentResponse.links.find(link => link.rel === 'approval_url');
      if (!approvalUrl) {
        return resolve({
          status: 'error',
          message: 'Approval URL not found in PayPal response',
          details: paymentResponse
        });
      }

      resolve({
        status: 'success',
        approvalUrl: approvalUrl.href,
        paymentId: paymentResponse.id
      });
    });
  });
};

// Get payment status
const getPaymentStatus = (paymentId) => {
  return new Promise((resolve, reject) => {
    paypal.payment.get(paymentId, (error, payment) => {
      if (error) {
        console.error('Error fetching payment status:', error);
        return resolve({
          status: 'error',
          message: 'Failed to fetch payment status',
          details: error.response ? error.response.details : error
        });
      }

      resolve({
        status: 'success',
        paymentState: payment.state, // 'created', 'approved', 'failed', etc.
        payerInfo: payment.payer?.payer_info
      });
    });
  });
};

module.exports = {
  makePayment,
  getPaymentStatus
};
