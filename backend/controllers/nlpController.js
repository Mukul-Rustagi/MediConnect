// controllers/nlpController.js
const nlpService = require('../services/nlpService'); // Importing nlpService
const { sendErrorResponse, sendSuccessResponse } = require('../utils/responseHandler');

// Convert audio to text
const convertAudioToText = async (req, res) => {
  try {
    const audioFile = req.file; // Audio file sent in the request
    const result = await nlpService.convertAudioToText(audioFile);
    if (result.status === 'error') {
      return res.status(400).json(result);
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(sendErrorResponse('Error processing audio.'));
  }
};

module.exports = {
  convertAudioToText,
};