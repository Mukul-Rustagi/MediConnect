const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, enum: ['M', 'F', 'O'], required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true},
    specialization: { type: String, required: true },
    experienceYears: { type: Number, required: true },
    clinicAddress: { type: String, required: true },
    availableDays: { type: String }, // e.g. "Mon, Wed, Fri"
    timing: { type: String },        // e.g. "10:00 AM - 4:00 PM"
    password:{type:String,required:true},
    role:{type:String,required:true},
    token:{type:String,required:true}
});

module.exports = mongoose.model('Doctor', doctorSchema);