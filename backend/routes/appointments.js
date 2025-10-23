const express = require('express');
const Appointment = require('../models/Appointment');
const auth = require('../middleware/auth');
const router = express.Router();

// Get appointments
router.get('/', auth, async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate({
        path: 'patientId',
        select: 'name email phone role'
      })
      .populate({
        path: 'doctorId', 
        select: 'name email phone role'
      });
    res.json(appointments);
  } catch (err) {
    console.error('Error fetching appointments:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Create appointment
router.post('/', auth, async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    
    const populatedAppointment = await Appointment.findById(appointment._id)
      .populate({
        path: 'patientId',
        select: 'name email phone role'
      })
      .populate({
        path: 'doctorId',
        select: 'name email phone role'
      });
    
    res.json(populatedAppointment);
  } catch (err) {
    console.error('Error creating appointment:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update appointment
router.put('/:id', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;