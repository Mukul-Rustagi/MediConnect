const Appointment = require('../models/Appointment');
const redis = require('../config/redis');


exports.bookAppointment = async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    await redis.del(`appointments:user:${appointment.userId}`);
    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ message: 'Booking failed', error: err.message });
  }
};


exports.getAppointmentsByUser = async (req, res) => {
  const { userId } = req.params;
  const cacheKey = `appointments:user:${userId}`;
  try {
    const cached = await redis.get(cacheKey);
    if (cached) return res.json(JSON.parse(cached));

    const appointments = await Appointment.find({ userId });
    await redis.set(cacheKey, JSON.stringify(appointments), 'EX', 300);
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch appointments', error: err.message });
  }
};


exports.updateAppointment = async (req, res) => {
  try {
    const updated = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    await redis.del(`appointments:user:${updated.userId}`);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
};


exports.cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (appointment) {
      await redis.del(`appointments:user:${appointment.userId}`);
    }
    res.json({ message: 'Appointment cancelled' });
  } catch (err) {
    res.status(500).json({ message: 'Cancellation failed', error: err.message });
  }
};