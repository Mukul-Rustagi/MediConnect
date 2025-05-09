const Report = require('../models/Report');
const redis = require('../config/redis');

exports.generateReport = async (req, res) => {
  try {
    const report = new Report(req.body);
    await report.save();
    res.status(201).json(report);
  } catch (err) {
    res.status(500).json({ message: 'Report generation failed', error: err.message });
  }
};


exports.getUserReports = async (req, res) => {
  const { userId } = req.params;
  const cacheKey = `reports:user:${userId}`;
  try {
    const cached = await redis.get(cacheKey);
    if (cached) return res.json(JSON.parse(cached));

    const reports = await Report.find({ userId });
    await redis.set(cacheKey, JSON.stringify(reports), 'EX', 300);
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: 'Fetching reports failed', error: err.message });
  }
};


exports.deleteReport = async (req, res) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.id);
    if (report) {
      await redis.del(`reports:user:${report.userId}`);
    }
    res.json({ message: 'Report deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed', error: err.message });
  }
};