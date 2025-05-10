const nlpService = require('../services/nlpService');
const { sendErrorResponse } = require('../utils/responseHandler');

exports.storeConversationController = async (req, res) => {
  try {
    const { conversationText, patientId } = req.body;
    const doctorId = req.user.id; // assuming authenticated doctor

    const result = await nlpService.storeConversation(conversationText, doctorId, patientId);
    if (result.status === 'error') {
      return res.status(400).json(result);
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(sendErrorResponse('Failed to store conversation.'));
  }
};

exports.generatePrescriptionController = async (req, res) => {
  try {
    const { conversationText } = req.body;

    const result = await nlpService.generatePrescription(conversationText);
    if (result.status === 'error') {
      return res.status(400).json(result);
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(sendErrorResponse('Failed to generate prescription.'));
  }
};
