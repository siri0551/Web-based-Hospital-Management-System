import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { patientsAPI, doctorsAPI, appointmentsAPI } from '../services/api';

const Dashboard = ({ user }) => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    patients: 0,
    doctors: 0,
    appointments: 0,
    todayAppointments: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [patientsRes, doctorsRes, appointmentsRes] = await Promise.all([
        patientsAPI.getAll(),
        doctorsAPI.getAll(),
        appointmentsAPI.getAll()
      ]);

      const today = new Date().toDateString();
      const todayAppointments = appointmentsRes.data.filter(
        apt => new Date(apt.date).toDateString() === today
      ).length;

      setStats({
        patients: patientsRes.data.length,
        doctors: doctorsRes.data.length,
        appointments: appointmentsRes.data.length,
        todayAppointments
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <p>Welcome back, {user.name}!</p>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{stats.patients}</div>
          <div className="stat-label">Total Patients</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.doctors}</div>
          <div className="stat-label">Total Doctors</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.appointments}</div>
          <div className="stat-label">Total Appointments</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.todayAppointments}</div>
          <div className="stat-label">Today's Appointments</div>
        </div>
      </div>

      <div className="card">
        <h3>Quick Actions</h3>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          {user.role === 'patient' && (
            <>
              <button className="btn" onClick={() => navigate('/patients')}>Book Appointment</button>
              <button className="btn btn-success" onClick={() => navigate('/doctors')}>View Doctors</button>
            </>
          )}
          {user.role === 'doctor' && (
            <>
              <button className="btn" onClick={() => navigate('/doctors')}>My Appointments</button>
              <button className="btn btn-success">View Today's Schedule</button>
            </>
          )}
          {user.role === 'admin' && (
            <>
              <button className="btn" onClick={() => navigate('/patients')}>Manage Patients</button>
              <button className="btn btn-success" onClick={() => navigate('/appointments')}>View All Appointments</button>
              <button className="btn" onClick={() => navigate('/doctors')}>Manage Doctors</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;