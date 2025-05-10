const Report = require('../models/Report');
const redis = require('../config/redis');

// Generate Patient Report (Doctor)
exports.generatePatientReport = async (req, res) => {
  try {
    const report = new Report(req.body); // Create new report based on the request body
    await report.save(); // Save the report to the database
    res.status(201).json(report); // Respond with the newly created report
  } catch (err) {
    res.status(500).json({ message: 'Report generation failed', error: err.message });
  }
};

// Get All Patient Reports (Admin or Doctor)
exports.getPatientReports = async (req, res) => {
  const { userId } = req.params; // Extract the user ID from the request parameters
  const cacheKey = `reports:user:${userId}`; // Cache key for storing user-specific reports

  try {
    // Check if the reports are already cached
    const cached = await redis.get(cacheKey);
    if (cached) return res.json(JSON.parse(cached)); // If cached, return the cached reports

    // If not cached, fetch reports from the database
    const reports = await Report.find({ userId });
    // Store the reports in cache for 5 minutes (300 seconds)
    await redis.set(cacheKey, JSON.stringify(reports), 'EX', 300);
    res.json(reports); // Respond with the fetched reports
  } catch (err) {
    res.status(500).json({ message: 'Fetching reports failed', error: err.message });
  }
};

// Delete Patient Report
exports.deleteReport = async (req, res) => {
  try {
    // Find and delete the report by ID
    const report = await Report.findByIdAndDelete(req.params.id);
    if (report) {
      // Remove the cached reports if the report is successfully deleted
      await redis.del(`reports:user:${report.userId}`);
    }
    res.json({ message: 'Report deleted' }); // Respond with success message
  } catch (err) {
    res.status(500).json({ message: 'Delete failed', error: err.message });
  }
};