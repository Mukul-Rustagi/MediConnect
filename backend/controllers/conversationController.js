const pdfkit = require('pdfkit');
const fs = require('fs');
const path = require('path');
const redis = require('../config/redis');


exports.storeConversation = async (req, res) => {
  const { userId, doctorId, messages } = req.body;

  try {
    const filePath = path.join(__dirname, '../storage/conversations', `${userId}_${doctorId}_${Date.now()}.pdf`);
    const doc = new pdfkit();
    const writeStream = fs.createWriteStream(filePath);

    doc.pipe(writeStream);
    doc.text('Doctor-Patient Conversation\n');
    doc.text(`User ID: ${userId} | Doctor ID: ${doctorId}\n`);
    doc.text(`Date: ${new Date().toISOString()}\n\n`);

    messages.forEach(msg => {
      doc.text(`${msg.sender}: ${msg.text}`);
    });

    doc.end();



    res.status(201).json({ message: 'Conversation saved as PDF', filePath: filePath });
  } catch (err) {
    res.status(500).json({ message: 'Conversation saving failed', error: err.message });
  }
};