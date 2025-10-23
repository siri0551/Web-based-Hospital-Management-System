const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Doctor = require('./models/Doctor');
const Patient = require('./models/Patient');
const Appointment = require('./models/Appointment');
require('dotenv').config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create Users
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const users = await User.insertMany([
      {
        name: 'Dr. John Smith',
        email: 'john.smith@hospital.com',
        password: hashedPassword,
        role: 'doctor',
        phone: '+1-555-0101',
        address: '123 Medical Center Dr'
      },
      {
        name: 'Dr. Sarah Johnson',
        email: 'sarah.johnson@hospital.com',
        password: hashedPassword,
        role: 'doctor',
        phone: '+1-555-0102',
        address: '456 Healthcare Ave'
      },
      {
        name: 'Dr. Michael Brown',
        email: 'michael.brown@hospital.com',
        password: hashedPassword,
        role: 'doctor',
        phone: '+1-555-0103',
        address: '789 Wellness St'
      },
      {
        name: 'Alice Wilson',
        email: 'alice.wilson@email.com',
        password: hashedPassword,
        role: 'patient',
        phone: '+1-555-0201',
        address: '321 Oak Street'
      },
      {
        name: 'Bob Davis',
        email: 'bob.davis@email.com',
        password: hashedPassword,
        role: 'patient',
        phone: '+1-555-0202',
        address: '654 Pine Avenue'
      },
      {
        name: 'Carol Martinez',
        email: 'carol.martinez@email.com',
        password: hashedPassword,
        role: 'patient',
        phone: '+1-555-0203',
        address: '987 Elm Drive'
      },
      {
        name: 'Admin User',
        email: 'admin@hospital.com',
        password: hashedPassword,
        role: 'admin',
        phone: '+1-555-0001',
        address: 'Hospital Administration'
      }
    ]);

    console.log('Users created');

    // Create Doctors
    const doctors = await Doctor.insertMany([
      {
        userId: users[0]._id,
        doctorId: 'DOC001',
        specialization: 'Cardiology',
        experience: 15,
        qualification: 'MD, FACC',
        consultationFee: 200
      },
      {
        userId: users[1]._id,
        doctorId: 'DOC002',
        specialization: 'Pediatrics',
        experience: 12,
        qualification: 'MD, FAAP',
        consultationFee: 150
      },
      {
        userId: users[2]._id,
        doctorId: 'DOC003',
        specialization: 'Orthopedics',
        experience: 18,
        qualification: 'MD, FAAOS',
        consultationFee: 250
      }
    ]);

    console.log('Doctors created');

    // Create Patients
    const patients = await Patient.insertMany([
      {
        userId: users[3]._id,
        patientId: 'PAT001',
        age: 35,
        gender: 'Female',
        bloodGroup: 'A+',
        medicalHistory: ['Hypertension', 'Diabetes'],
        allergies: ['Penicillin']
      },
      {
        userId: users[4]._id,
        patientId: 'PAT002',
        age: 42,
        gender: 'Male',
        bloodGroup: 'O-',
        medicalHistory: ['Asthma'],
        allergies: ['Dust', 'Pollen']
      },
      {
        userId: users[5]._id,
        patientId: 'PAT003',
        age: 28,
        gender: 'Female',
        bloodGroup: 'B+',
        medicalHistory: [],
        allergies: []
      }
    ]);

    console.log('Patients created');

    // Create Appointments
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    await Appointment.insertMany([
      {
        patientId: users[3]._id,
        doctorId: users[0]._id,
        date: today,
        time: '09:00',
        status: 'scheduled',
        reason: 'Regular checkup'
      },
      {
        patientId: users[4]._id,
        doctorId: users[1]._id,
        date: today,
        time: '10:30',
        status: 'scheduled',
        reason: 'Asthma consultation'
      },
      {
        patientId: users[5]._id,
        doctorId: users[2]._id,
        date: tomorrow,
        time: '14:00',
        status: 'scheduled',
        reason: 'Knee pain'
      },
      {
        patientId: users[3]._id,
        doctorId: users[1]._id,
        date: tomorrow,
        time: '11:00',
        status: 'scheduled',
        reason: 'Follow-up'
      }
    ]);

    console.log('Appointments created');
    console.log('Sample data seeded successfully!');
    console.log('\nLogin credentials:');
    console.log('Doctors:');
    console.log('- john.smith@hospital.com / password123');
    console.log('- sarah.johnson@hospital.com / password123');
    console.log('- michael.brown@hospital.com / password123');
    console.log('Patients:');
    console.log('- alice.wilson@email.com / password123');
    console.log('- bob.davis@email.com / password123');
    console.log('- carol.martinez@email.com / password123');
    console.log('Admin:');
    console.log('- admin@hospital.com / password123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();