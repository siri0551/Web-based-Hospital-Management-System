import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, logout }) => {
  const renderNavLinks = () => {
    if (user.role === 'doctor') {
      return (
        <ul className="nav-links">
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/doctors">My Appointments</Link></li>
        </ul>
      );
    } else if (user.role === 'patient') {
      return (
        <ul className="nav-links">
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/patients">Book Appointment</Link></li>
          <li><Link to="/doctors">Doctors</Link></li>
        </ul>
      );
    } else {
      return (
        <ul className="nav-links">
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/patients">Patients</Link></li>
          <li><Link to="/doctors">Doctors</Link></li>
          <li><Link to="/appointments">Appointments</Link></li>
        </ul>
      );
    }
  };

  return (
    <nav className="navbar">
      <h1>🏥 Hospital Management</h1>
      {renderNavLinks()}
      <div>
        <span>Welcome, {user.name} ({user.role})</span>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;