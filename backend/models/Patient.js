const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  patientId: { type: String, unique: true, required: true },
  age: Number,
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  bloodGroup: String,
  medicalHistory: [String],
  allergies: [String]
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);