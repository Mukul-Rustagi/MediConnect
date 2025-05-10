// services/conversationService.js
const { sendSuccessResponse, sendErrorResponse } = require('../utils/responseHandler');
const { storeConversationInPdf } = require('../utils/pdfGenerator');

const storeConversation = async (conversationText, doctorId, patientId) => {
  try {
    const pdfFile = await storeConversationInPdf(conversationText, doctorId, patientId);
    return sendSuccessResponse({ message: 'Conversation stored successfully', pdfFile });
  } catch (error) {
    return sendErrorResponse(error.message);
  }
};

module.exports = { storeConversation };
