const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctorId: { type: String, unique: true, required: true },
  specialization: { type: String, required: true },
  experience: Number,
  qualification: String,
  consultationFee: Number,
  availability: [{
    day: String,
    startTime: String,
    endTime: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);