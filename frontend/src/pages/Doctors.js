import React, { useState, useEffect, useCallback } from 'react';
import { appointmentsAPI, doctorsAPI, authAPI } from '../services/api';

const Doctors = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDoctorForm, setNewDoctorForm] = useState({
    name: '', email: '', phone: '', doctorId: '', specialization: '', experience: '', qualification: '', consultationFee: ''
  });
  const currentUser = JSON.parse(localStorage.getItem('user'));

  const fetchMyAppointments = useCallback(async () => {
    try {
      const response = await appointmentsAPI.getAll();
      if (currentUser.role === 'doctor') {
        const myAppointments = response.data.filter(apt => 
          apt.doctorId?._id === currentUser.id
        );
        setAppointments(myAppointments);
      } else {
        setAppointments(response.data);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  }, [currentUser.id, currentUser.role]);

  const fetchDoctors = useCallback(async () => {
    try {
      const response = await doctorsAPI.getAll();
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  }, []);

  useEffect(() => {
    if (currentUser.role === 'doctor') {
      fetchMyAppointments();
    } else {
      fetchDoctors();
    }
  }, [fetchMyAppointments, fetchDoctors, currentUser.role]);

  const updateStatus = async (id, status) => {
    try {
      await appointmentsAPI.update(id, { status });
      fetchMyAppointments();
    } catch (error) {
      alert('Error updating appointment');
    }
  };

  if (currentUser.role === 'doctor') {
    return (
      <div className="container">
        <h1>My Appointments</h1>
        <p>Welcome Dr. {currentUser.name}</p>

      <div className="card">
        <h3>Today's Appointments</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Patient</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.filter(apt => 
              new Date(apt.date).toDateString() === new Date().toDateString()
            ).map((appointment) => (
              <tr key={appointment._id}>
                <td>{appointment.time}</td>
                <td>{appointment.patientId?.name || 'N/A'}</td>
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
                <td>
                  {appointment.status === 'scheduled' && (
                    <>
                      <button 
                        className="btn btn-success" 
                        style={{ marginRight: '0.5rem', padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
                        onClick={() => updateStatus(appointment._id, 'completed')}
                      >
                        Complete
                      </button>
                      <button 
                        className="btn btn-danger" 
                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
                        onClick={() => updateStatus(appointment._id, 'cancelled')}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h3>All My Appointments</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Patient</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>{new Date(appointment.date).toLocaleDateString()}</td>
                <td>{appointment.time}</td>
                <td>{appointment.patientId?.name || 'N/A'}</td>
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
  }

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    try {
      // First create user account
      const userResponse = await authAPI.register({
        name: newDoctorForm.name,
        email: newDoctorForm.email,
        password: 'doctor123', // Default password
        role: 'doctor',
        phone: newDoctorForm.phone
      });
      
      const userData = userResponse.data;
      
      // Then create doctor profile
      await doctorsAPI.create({
        userId: userData.user.id,
        doctorId: newDoctorForm.doctorId,
        specialization: newDoctorForm.specialization,
        experience: newDoctorForm.experience,
        qualification: newDoctorForm.qualification,
        consultationFee: newDoctorForm.consultationFee
      });
      
      setShowAddForm(false);
      setNewDoctorForm({
        name: '', email: '', phone: '', doctorId: '', specialization: '', experience: '', qualification: '', consultationFee: ''
      });
      fetchDoctors();
      alert('Doctor added successfully! Default password: doctor123');
    } catch (error) {
      console.error('Error adding doctor:', error);
      alert('Error adding doctor');
    }
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1>Doctors</h1>
          <p>Available Doctors in our Hospital</p>
        </div>
        {currentUser.role === 'admin' && (
          <button className="btn" onClick={() => setShowAddForm(!showAddForm)}>
            {showAddForm ? 'Cancel' : 'Add New Doctor'}
          </button>
        )}
      </div>

      {showAddForm && currentUser.role === 'admin' && (
        <div className="card">
          <h3>Add New Doctor</h3>
          <form onSubmit={handleAddDoctor}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={newDoctorForm.name}
                  onChange={(e) => setNewDoctorForm({...newDoctorForm, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={newDoctorForm.email}
                  onChange={(e) => setNewDoctorForm({...newDoctorForm, email: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={newDoctorForm.phone}
                  onChange={(e) => setNewDoctorForm({...newDoctorForm, phone: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Doctor ID</label>
                <input
                  type="text"
                  value={newDoctorForm.doctorId}
                  onChange={(e) => setNewDoctorForm({...newDoctorForm, doctorId: e.target.value})}
                  placeholder="DOC004"
                  required
                />
              </div>
              <div className="form-group">
                <label>Specialization</label>
                <input
                  type="text"
                  value={newDoctorForm.specialization}
                  onChange={(e) => setNewDoctorForm({...newDoctorForm, specialization: e.target.value})}
                  placeholder="Neurology"
                  required
                />
              </div>
              <div className="form-group">
                <label>Experience (years)</label>
                <input
                  type="number"
                  value={newDoctorForm.experience}
                  onChange={(e) => setNewDoctorForm({...newDoctorForm, experience: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Qualification</label>
                <input
                  type="text"
                  value={newDoctorForm.qualification}
                  onChange={(e) => setNewDoctorForm({...newDoctorForm, qualification: e.target.value})}
                  placeholder="MBBS, MD"
                  required
                />
              </div>
              <div className="form-group">
                <label>Consultation Fee (₹)</label>
                <input
                  type="number"
                  value={newDoctorForm.consultationFee}
                  onChange={(e) => setNewDoctorForm({...newDoctorForm, consultationFee: e.target.value})}
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn">Add Doctor</button>
            <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
              Note: Default password will be 'doctor123' - doctor can change it later
            </p>
          </form>
        </div>
      )}

      <div className="card">
        <h3>Our Medical Team</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Specialization</th>
              <th>Experience</th>
              <th>Qualification</th>
              <th>Consultation Fee</th>
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
    </div>
  );
};

export default Doctors;