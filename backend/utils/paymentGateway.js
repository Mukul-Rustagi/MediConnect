// utils/paymentGateway.js
const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');
require('dotenv').config();

const environment = process.env.NODE_ENV === 'production'
  ? new checkoutNodeJssdk.core.LiveEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET)
  : new checkoutNodeJssdk.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET);

const paypalClient = new checkoutNodeJssdk.core.PayPalHttpClient(environment);

// Process payment: create a PayPal order
const processPayment = async (paymentData) => {
  const request = new checkoutNodeJssdk.orders.OrdersCreateRequest();
  request.prefer('return=representation');
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'USD',
        value: paymentData.amount.toString()
      }
    }]
  });

  const response = await paypalClient.execute(request);
  return {
    orderID: response.result.id,
    status: response.result.status
  };
};

// Get payment status: capture a PayPal order
const getPaymentStatus = async (orderId) => {
  const request = new checkoutNodeJssdk.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});

  const response = await paypalClient.execute(request);
  return {
    status: response.result.status,
    captureID: response.result.purchase_units?.[0]?.payments?.captures?.[0]?.id
  };
};

module.exports = {
  processPayment,
  getPaymentStatus
};
