// services/nlpService.js
const { sendErrorResponse, sendSuccessResponse } = require('../utils/responseHandler');
const { processConversation, generatePrescription } = require('../utils/nlpProcessor');
const { storeConversationInPdf } = require('../utils/pdfGenerator');

// Store doctor-patient conversation as PDF
const storeConversation = async (conversationText, doctorId, patientId) => {
  try {
    const pdfFile = await storeConversationInPdf(conversationText, doctorId, patientId);
    return sendSuccessResponse({ message: 'Conversation stored successfully', pdfFile });
  } catch (error) {
    return sendErrorResponse(error.message);
  }
};

// Generate a prescription using NLP
const generatePrescription = async (conversationText) => {
  try {
    const prescription = await generatePrescription(conversationText);
    return sendSuccessResponse(prescription);
  } catch (error) {
    return sendErrorResponse(error.message);
  }
};

module.exports = {
  storeConversation,
  generatePrescription,
};