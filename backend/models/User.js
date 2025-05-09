const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String, default: null }, // Path to the profile picture
  meetingFiles: [
    {
      doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
      files: [String], // Array of file paths
      date: { type: Date, default: Date.now },
    }
  ],
});

module.exports = mongoose.model('User', userSchema);
