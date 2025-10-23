const express = require('express');
const Doctor = require('../models/Doctor');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find().populate('userId', 'name email phone');
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Create doctor
router.post('/', auth, async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    const populatedDoctor = await Doctor.findById(doctor._id).populate('userId', 'name email phone');
    res.json(populatedDoctor);
  } catch (err) {
    console.error('Error creating doctor:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

module.exports = router;