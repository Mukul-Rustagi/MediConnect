const { storeConversation } = require('../services/conversationService');

// POST /api/conversation/store
exports.storeConversation = async (req, res) => {
  const { messages, doctorId, patientId } = req.body;

  const conversationText = messages
    .map(msg => `${msg.sender}: ${msg.text}`)
    .join('\n');

  const result = await storeConversation(conversationText, doctorId, patientId);

  if (result.status === 'error') {
    return res.status(500).json(result);
  }

  return res.status(201).json(result);
};
