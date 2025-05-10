const DoctorPrescription = require('../models/DoctorPrescription');
const pdfkit = require('pdfkit');
const fs = require('fs');
const path = require('path');
const redis = require('../config/redis');


exports.createPrescription = async (req, res) => {
  const { userId, doctorId, prescriptionDetails } = req.body;

  try {
    const prescription = new DoctorPrescription({
      userId,
      doctorId,
      prescriptionDetails,
    });

    await prescription.save();
    

    const doc = new pdfkit();
    const filePath = path.join(__dirname, '../storage/prescriptions', `${userId}_${Date.now()}.pdf`);
    const writeStream = fs.createWriteStream(filePath);
    
    doc.pipe(writeStream);
    doc.text('Doctor Prescription\n');
    doc.text(`User ID: ${userId}\n`);
    doc.text(`Doctor ID: ${doctorId}\n`);
    doc.text(`Date Issued: ${prescription.dateIssued}\n\n`);

    doc.text('Medications:\n');
    prescriptionDetails.medications.forEach(med => {
      doc.text(`- ${med.name} | Dosage: ${med.dosage} | Frequency: ${med.frequency}`);
    });

    doc.text(`\nInstructions: ${prescriptionDetails.instructions}`);

    doc.end();


    prescription.pdfPath = filePath;
    await prescription.save();

    res.status(201).json({ message: 'Prescription created and saved', pdfPath: filePath });
  } catch (err) {
    res.status(500).json({ message: 'Prescription creation failed', error: err.message });
  }
};