# Hospital Management System Setup Guide

## Prerequisites
- Node.js (v14 or higher)
- MongoDB Compass
- Git

## Installation Steps

### 1. Backend Setup
```bash
cd backend
npm install
```

### 2. Frontend Setup
```bash
cd frontend
npm install
```

### 3. Database Setup
1. Open MongoDB Compass
2. Connect to: `mongodb://localhost:27017`
3. Create database: `hospital_management`

### 4. Environment Configuration
Update `backend/.env` with your MongoDB connection string if different.

### 5. Running the Application

#### Start Backend (Terminal 1)
```bash
cd backend
npm run dev
```

#### Start Frontend (Terminal 2)
```bash
cd frontend
npm start
```

### 6. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Default Login Credentials
Create an account using the registration form.

## Features
- User Authentication (Admin, Doctor, Patient)
- Patient Management
- Doctor Management
- Appointment Scheduling
- Dashboard with Statistics
- Responsive Design

## API Endpoints
- POST /api/auth/login - User login
- POST /api/auth/register - User registration
- GET /api/patients - Get all patients
- POST /api/patients - Create patient
- GET /api/doctors - Get all doctors
- POST /api/doctors - Create doctor
- GET /api/appointments - Get all appointments
- POST /api/appointments - Create appointment
- PUT /api/appointments/:id - Update appointment