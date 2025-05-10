// services/prescriptionService.js
const { sendSuccessResponse, sendErrorResponse } = require('../utils/responseHandler');
const { generatePrescription } = require('../utils/nlpProcessor');

const createPrescription = async (conversationText) => {
  try {
    const prescription = await generatePrescription(conversationText); // AI-generated
    return sendSuccessResponse(prescription);
  } catch (error) {
    return sendErrorResponse(error.message);
  }
};

module.exports = { createPrescription };
