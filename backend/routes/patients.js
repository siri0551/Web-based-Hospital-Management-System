const express = require('express');
const Patient = require('../models/Patient');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all patients
router.get('/', auth, async (req, res) => {
  try {
    const patients = await Patient.find().populate('userId', 'name email phone');
    res.json(patients);
  } catch (err) {
    console.error('Error fetching patients:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Create patient
router.post('/', auth, async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    const populatedPatient = await Patient.findById(patient._id).populate('userId', 'name email phone');
    res.json(populatedPatient);
  } catch (err) {
    console.error('Error creating patient:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// Update patient
router.put('/:id', auth, async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;