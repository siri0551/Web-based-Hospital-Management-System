import React, { useState, useEffect, useCallback } from 'react';
import { doctorsAPI, appointmentsAPI, patientsAPI, authAPI } from '../services/api';

const Patients = () => {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [myAppointments, setMyAppointments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showAddPatientForm, setShowAddPatientForm] = useState(false);
  const [formData, setFormData] = useState({
    doctorId: '', date: '', time: '', reason: ''
  });
  const [newPatientForm, setNewPatientForm] = useState({
    name: '', email: '', phone: '', patientId: '', age: '', gender: '', bloodGroup: ''
  });
  const currentUser = JSON.parse(localStorage.getItem('user'));

  const fetchDoctors = useCallback(async () => {
    try {
      const response = await doctorsAPI.getAll();
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  }, []);

  const fetchPatients = useCallback(async () => {
    try {
      const response = await patientsAPI.getAll();
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  }, []);

  const fetchMyAppointments = useCallback(async () => {
    try {
      const response = await appointmentsAPI.getAll();
      // Filter appointments for current patient
      const patientAppointments = response.data.filter(apt => 
        apt.patientId?._id === currentUser.id
      );
      setMyAppointments(patientAppointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  }, [currentUser.id]);

  useEffect(() => {
    if (currentUser.role === 'patient') {
      fetchDoctors();
      fetchMyAppointments();
    } else {
      fetchPatients();
    }
  }, [fetchDoctors, fetchMyAppointments, fetchPatients, currentUser.role]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create appointment directly with user ID
      await appointmentsAPI.create({
        ...formData,
        patientId: currentUser.id // Use user ID directly
      });
      setShowForm(false);
      setFormData({
        doctorId: '', date: '', time: '', reason: ''
      });
      fetchMyAppointments();
      alert('Appointment booked successfully!');
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Error booking appointment');
    }
  };

  const handleAddPatient = async (e) => {
      e.preventDefault();
      try {
        // First create user account
        const userResponse = await authAPI.register({
          name: newPatientForm.name,
          email: newPatientForm.email,
          password: 'patient123', // Default password
          role: 'patient',
          phone: newPatientForm.phone
        });
        
        const userData = userResponse.data;
        
        // Then create patient profile
        await patientsAPI.create({
          userId: userData.user.id,
          patientId: newPatientForm.patientId,
          age: newPatientForm.age,
          gender: newPatientForm.gender,
          bloodGroup: newPatientForm.bloodGroup,
          medicalHistory: [],
          allergies: []
        });
        
        setShowAddPatientForm(false);
        setNewPatientForm({
          name: '', email: '', phone: '', patientId: '', age: '', gender: '', bloodGroup: ''
        });
        fetchPatients();
        alert('Patient added successfully! Default password: patient123');
      } catch (error) {
        console.error('Error adding patient:', error);
        alert('Error adding patient');
      }
    };

  if (currentUser.role === 'admin') {
    return (
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1>Patient Management</h1>
            <p>Manage all registered patients</p>
          </div>
          <button className="btn" onClick={() => setShowAddPatientForm(!showAddPatientForm)}>
            {showAddPatientForm ? 'Cancel' : 'Add New Patient'}
          </button>
        </div>

        {showAddPatientForm && (
          <div className="card">
            <h3>Add New Patient</h3>
            <form onSubmit={handleAddPatient}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={newPatientForm.name}
                    onChange={(e) => setNewPatientForm({...newPatientForm, name: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={newPatientForm.email}
                    onChange={(e) => setNewPatientForm({...newPatientForm, email: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    value={newPatientForm.phone}
                    onChange={(e) => setNewPatientForm({...newPatientForm, phone: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Patient ID</label>
                  <input
                    type="text"
                    value={newPatientForm.patientId}
                    onChange={(e) => setNewPatientForm({...newPatientForm, patientId: e.target.value})}
                    placeholder="PAT004"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Age</label>
                  <input
                    type="number"
                    value={newPatientForm.age}
                    onChange={(e) => setNewPatientForm({...newPatientForm, age: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Gender</label>
                  <select
                    value={newPatientForm.gender}
                    onChange={(e) => setNewPatientForm({...newPatientForm, gender: e.target.value})}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Blood Group</label>
                  <select
                    value={newPatientForm.bloodGroup}
                    onChange={(e) => setNewPatientForm({...newPatientForm, bloodGroup: e.target.value})}
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="btn">Add Patient</button>
              <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
                Note: Default password will be 'patient123' - patient can change it later
              </p>
            </form>
          </div>
        )}

        <div className="card">
          <h3>All Patients</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Blood Group</th>
                <th>Phone</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient._id}>
                  <td>{patient.patientId}</td>
                  <td>{patient.userId?.name || 'N/A'}</td>
                  <td>{patient.age}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.bloodGroup}</td>
                  <td>{patient.userId?.phone || 'N/A'}</td>
                  <td>{patient.userId?.email || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Book Appointment</h1>
      <p>Welcome {currentUser.name}</p>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Available Doctors</h2>
        <button className="btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Book Appointment'}
        </button>
      </div>

      {showForm && (
        <div className="card">
          <h3>Book New Appointment</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>Select Doctor</label>
                <select
                  value={formData.doctorId}
                  onChange={(e) => setFormData({...formData, doctorId: e.target.value})}
                  required
                >
                  <option value="">Choose a doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor._id} value={doctor._id}>
                      Dr. {doctor.userId?.name} - {doctor.specialization} (₹{doctor.consultationFee})
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div className="form-group">
                <label>Time</label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  required
                >
                  <option value="">Select time</option>
                  <option value="09:00">09:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="14:00">02:00 PM</option>
                  <option value="15:00">03:00 PM</option>
                  <option value="16:00">04:00 PM</option>
                </select>
              </div>
              <div className="form-group">
                <label>Reason for Visit</label>
                <input
                  type="text"
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                  placeholder="Brief description"
                />
              </div>
            </div>
            <button type="submit" className="btn">Book Appointment</button>
          </form>
        </div>
      )}

      <div className="card">
        <h3>Available Doctors</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Specialization</th>
              <th>Experience</th>
              <th>Qualification</th>
              <th>Fee</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor._id}>
                <td>Dr. {doctor.userId?.name || 'N/A'}</td>
                <td>{doctor.specialization}</td>
                <td>{doctor.experience} years</td>
                <td>{doctor.qualification}</td>
                <td>₹{doctor.consultationFee}</td>
                <td>{doctor.userId?.phone || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h3>My Appointments</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Doctor</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {myAppointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>{new Date(appointment.date).toLocaleDateString()}</td>
                <td>{appointment.time}</td>
                <td>Dr. {appointment.doctorId?.name || 'N/A'}</td>
                <td>{appointment.reason}</td>
                <td>
                  <span style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '3px',
                    fontSize: '0.8rem',
                    background: appointment.status === 'completed' ? '#2ed573' : 
                               appointment.status === 'cancelled' ? '#ff4757' : '#ffa502',
                    color: 'white'
                  }}>
                    {appointment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Patients;