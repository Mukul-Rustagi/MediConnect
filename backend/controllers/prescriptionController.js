const DoctorPrescription = require('../models/DoctorPrescription');
const pdfkit = require('pdfkit');
const fs = require('fs');
const path = require('path');
const { createPrescription } = require('../services/prescriptionService');

// POST /api/prescription/generate
exports.createPrescription = async (req, res) => {
  const { userId, doctorId, conversationText } = req.body;

  const result = await createPrescription(conversationText);

  if (result.status === 'error') {
    return res.status(400).json(result);
  }

  const prescriptionDetails = result.data;

  try {
    // Save prescription to DB
    const prescription = new DoctorPrescription({
      userId,
      doctorId,
      prescriptionDetails,
    });

    await prescription.save();

    // Generate PDF
    const doc = new pdfkit();
    const filePath = path.join(__dirname, '../storage/prescriptions', `${userId}_${Date.now()}.pdf`);
    const writeStream = fs.createWriteStream(filePath);

    doc.pipe(writeStream);
    doc.text('Doctor Prescription\n');
    doc.text(`User ID: ${userId}\nDoctor ID: ${doctorId}\nDate Issued: ${prescription.dateIssued}\n\n`);

    doc.text('Medications:\n');
    prescriptionDetails.medications.forEach(med => {
      doc.text(`- ${med.name} | Dosage: ${med.dosage} | Frequency: ${med.frequency}`);
    });

    doc.text(`\nInstructions: ${prescriptionDetails.instructions}`);
    doc.end();

    prescription.pdfPath = filePath;
    await prescription.save();

    return res.status(201).json({ message: 'Prescription generated and saved', pdfPath: filePath });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to save prescription', error: error.message });
  }
};
