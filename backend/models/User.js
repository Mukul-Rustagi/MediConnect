const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String },
  dateOfBirth: { type: Date },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  bloodType: { type: String },
  allergies: { type: String },
  conditions: { type: String },
  medications: { type: String },
  country: { type: String},
  password: { type: String, required: true },
  profilePicture: { type: String, default: null },
  role: { type: String, required: true },
  meetingFile:{type:String}
});

module.exports = mongoose.model('Users', userSchema);
