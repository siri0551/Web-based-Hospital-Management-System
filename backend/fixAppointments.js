const mongoose = require('mongoose');
const Appointment = require('./models/Appointment');
require('dotenv').config();

const fixAppointments = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Delete all existing appointments and recreate them
    await Appointment.deleteMany({});
    console.log('Cleared existing appointments');

    // Get user IDs from the seeded data
    const User = require('./models/User');
    const users = await User.find();
    
    const doctors = users.filter(u => u.role === 'doctor');
    const patients = users.filter(u => u.role === 'patient');

    if (doctors.length === 0 || patients.length === 0) {
      console.log('No doctors or patients found. Please run seedData.js first.');
      process.exit(1);
    }

    // Create new appointments with proper user references
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    await Appointment.insertMany([
      {
        patientId: patients[0]._id, // Alice Wilson
        doctorId: doctors[0]._id,   // Dr. John Smith
        date: today,
        time: '09:00',
        status: 'completed',
        reason: 'Regular checkup'
      },
      {
        patientId: patients[1]._id, // Bob Davis
        doctorId: doctors[1]._id,   // Dr. Sarah Johnson
        date: today,
        time: '10:30',
        status: 'scheduled',
        reason: 'Asthma consultation'
      },
      {
        patientId: patients[2]._id, // Carol Martinez
        doctorId: doctors[2]._id,   // Dr. Michael Brown
        date: tomorrow,
        time: '14:00',
        status: 'scheduled',
        reason: 'Knee pain'
      },
      {
        patientId: patients[0]._id, // Alice Wilson
        doctorId: doctors[1]._id,   // Dr. Sarah Johnson
        date: tomorrow,
        time: '11:00',
        status: 'scheduled',
        reason: 'Follow-up'
      }
    ]);

    console.log('Fixed appointments created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error fixing appointments:', error);
    process.exit(1);
  }
};

fixAppointments();