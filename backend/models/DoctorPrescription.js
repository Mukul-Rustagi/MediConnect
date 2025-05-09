// models/DoctorPrescription.js
const mongoose = require('mongoose');

const doctorPrescriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  prescriptionDetails: {
    medications: [{ name: String, dosage: String, frequency: String }],
    instructions: String,
  },
  dateIssued: { type: Date, default: Date.now },
});

module.exports = mongoose.model('DoctorPrescription', doctorPrescriptionSchema);
