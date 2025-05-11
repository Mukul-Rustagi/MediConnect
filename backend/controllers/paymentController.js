const { Client } = require('square');
const Appointment = require('../models/Appointment');
const mongoose = require('mongoose');

// Initialize Square client
const client = new Client({
  accessToken: 'EAAAl-2AMDEcC0VzxUZe__ZXwYw7J5mGMl96E6Sdwcj4P6jChght__7FoCGc2AP9',
  environment: 'sandbox'
});

// Function to get location ID
const getLocationId = async () => {
  try {
    const response = await client.locationsApi.listLocations();
    if (response.result.locations && response.result.locations.length > 0) {
      return response.result.locations[0].id;
    }
    throw new Error('No locations found');
  } catch (error) {
    console.error('Error getting location ID:', error);
    throw error;
  }
};

// Function to book appointment
const bookAppointment = async (appointmentData, paymentId) => {
  try {
    // Create new appointment with required fields
    const appointment = new Appointment({
      userId: new mongoose.Types.ObjectId(appointmentData.userId),
      doctorId: new mongoose.Types.ObjectId(appointmentData.doctorId),
      dateTime: new Date(appointmentData.dateTime),
      status: 'completed',
      paymentId: paymentId
    });

    await appointment.save();
    console.log('Appointment saved successfully:', appointment);
    return appointment;
  } catch (error) {
    console.error('Error booking appointment:', error);
    throw error;
  }
};

// Helper function to convert payment object to plain object
const convertPaymentToPlainObject = (payment) => {
  return {
    id: payment.id,
    status: payment.status,
    amountMoney: {
      amount: payment.amountMoney.amount.toString(),
      currency: payment.amountMoney.currency
    },
    createdAt: payment.createdAt,
    updatedAt: payment.updatedAt,
    locationId: payment.locationId,
    orderId: payment.orderId,
    referenceId: payment.referenceId,
    receiptNumber: payment.receiptNumber,
    receiptUrl: payment.receiptUrl
  };
};

// Process payment
const processPayment = async (req, res) => {
  try {
    const { sourceId, amount, appointmentData } = req.body;

    if (!sourceId || !amount || !appointmentData) {
      return res.status(400).json({
        success: false,
        message: 'Missing required payment data'
      });
    }

    // Validate required appointment fields
    if (!appointmentData.userId || !appointmentData.doctorId || !appointmentData.dateTime) {
      return res.status(400).json({
        success: false,
        message: 'Missing required appointment data'
      });
    }

    // Get location ID
    const locationId = await getLocationId();

    // Create a timestamp for unique reference
    const timestamp = Date.now().toString();
    const shortUserId = appointmentData.userId.slice(-4);
    const referenceId = `PAY-${shortUserId}-${timestamp.slice(-6)}`;

    // Create payment request
    const paymentRequest = {
      sourceId,
      amountMoney: {
        amount: Math.round(amount * 100), // Convert to cents
        currency: 'USD'
      },
      locationId,
      idempotencyKey: referenceId,
      referenceId: referenceId,
      note: 'Appointment payment'
    };

    // Process payment
    const payment = await client.paymentsApi.createPayment(paymentRequest);

    if (payment.result.payment.status === 'COMPLETED') {
      // Book appointment after successful payment
      const appointment = await bookAppointment(appointmentData, payment.result.payment.id);
      
      // Convert payment object to plain object
      const plainPayment = convertPaymentToPlainObject(payment.result.payment);
      
      return res.status(200).json({
        success: true,
        message: 'Payment successful and appointment booked',
        data: {
          payment: plainPayment,
          appointment: appointment
        }
      });
    } else {
      throw new Error('Payment not completed');
    }
  } catch (error) {
    console.error('Payment processing error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Payment processing failed'
    });
  }
};

// Get payment status
const getPaymentStatus = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const payment = await client.paymentsApi.getPayment(paymentId);
    
    // Convert payment object to plain object
    const plainPayment = convertPaymentToPlainObject(payment.result.payment);
    
    return res.status(200).json({
      success: true,
      data: plainPayment
    });
  } catch (error) {
    console.error('Error getting payment status:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to get payment status'
    });
  }
};

module.exports = {
  processPayment,
  getPaymentStatus
};
