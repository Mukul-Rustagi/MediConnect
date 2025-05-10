const Consultation = require('../models/Consultation');

// Create a new Consultation
exports.createConsultation = async (req, res) => {
  try {
    const consultation = new Consultation(req.body);
    await consultation.save();
    res.status(201).json(consultation);
  } catch (err) {
    res.status(500).json({ message: 'Creation failed', error: err.message });
  }
};

// Get Consultation details by ID
exports.getConsultation = async (req, res) => {
  try {
    const consultation = await Consultation.findById(req.params.id);
    if (!consultation) return res.status(404).json({ message: 'Consultation not found' });
    res.json(consultation);
  } catch (err) {
    res.status(500).json({ message: 'Retrieval failed', error: err.message });
  }
};

// Update Consultation by ID
exports.updateConsultation = async (req, res) => {
  try {
    const updated = await Consultation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Consultation not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
};

// Delete Consultation by ID
exports.deleteConsultation = async (req, res) => {
  try {
    const consultation = await Consultation.findByIdAndDelete(req.params.id);
    if (!consultation) return res.status(404).json({ message: 'Consultation not found' });
    res.json({ message: 'Consultation deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed', error: err.message });
  }
};