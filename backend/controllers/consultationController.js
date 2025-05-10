const Consultation = require('../models/Consultation');


exports.createConsultation = async (req, res) => {
  try {
    const consultation = new Consultation(req.body);
    await consultation.save();
    res.status(201).json(consultation);
  } catch (err) {
    res.status(500).json({ message: 'Creation failed', error: err.message });
  }
};


exports.getConsultation = async (req, res) => {
  try {
    const consultation = await Consultation.findById(req.params.id);
    if (!consultation) return res.status(404).json({ message: 'Not found' });
    res.json(consultation);
  } catch (err) {
    res.status(500).json({ message: 'Retrieval failed', error: err.message });
  }
};


exports.updateConsultation = async (req, res) => {
  try {
    const updated = await Consultation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
};


exports.deleteConsultation = async (req, res) => {
  try {
    await Consultation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Consultation deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed', error: err.message });
  }
};