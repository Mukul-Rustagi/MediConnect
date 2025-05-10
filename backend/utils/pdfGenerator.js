const pdfkit = require('pdfkit');
const fs = require('fs');
const path = require('path');

exports.storeConversationInPdf = async (conversationText, doctorId, patientId) => {
  return new Promise((resolve, reject) => {
    try {
      const fileName = `${patientId}_${doctorId}_${Date.now()}.pdf`;
      const filePath = path.join(__dirname, '../storage/conversations', fileName);
      const doc = new pdfkit();
      const writeStream = fs.createWriteStream(filePath);

      doc.pipe(writeStream);
      doc.text('Doctor-Patient Conversation');
      doc.moveDown();
      doc.text(`Doctor ID: ${doctorId}`);
      doc.text(`Patient ID: ${patientId}`);
      doc.text(`Date: ${new Date().toISOString()}`);
      doc.moveDown();
      doc.text(conversationText);
      doc.end();

      writeStream.on('finish', () => resolve(filePath));
      writeStream.on('error', (err) => reject(err));
    } catch (error) {
      reject(error);
    }
  });
};
