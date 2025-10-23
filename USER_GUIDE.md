# Hospital Management System - User Guide

## 🏥 System Overview
The Hospital Management System is a web-based application that manages hospital operations with three user roles: **Admin**, **Doctor**, and **Patient**.

## 🚀 Getting Started

### 1. Setup & Installation
```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (new terminal)
cd frontend
npm install
npm start
```

### 2. Access the Application
- **URL**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 👥 User Roles & Workflows

### 🔐 **ADMIN ROLE**
**Login**: admin@hospital.com / password123

#### Admin Dashboard Features:
- View system statistics (total patients, doctors, appointments)
- Manage all hospital operations
- Access all data across the system

#### Admin Workflow Example:
1. **Login** → Dashboard shows hospital overview
2. **Doctors Page** → View all available doctors
3. **Patients Page** → View all registered patients  
4. **Appointments Page** → View/manage all appointments

---

### 👨⚕️ **DOCTOR ROLE**
**Sample Logins**:
- john.smith@hospital.com / password123 (Cardiologist)
- sarah.johnson@hospital.com / password123 (Pediatrician)
- michael.brown@hospital.com / password123 (Orthopedist)

#### Doctor Dashboard Features:
- View personal appointment schedule
- Manage patient appointments
- Update appointment status

#### Doctor Workflow Example:
1. **Login as Dr. John Smith**
2. **Dashboard** → See today's statistics
3. **Doctors Page** → View "My Appointments"
   - **Today's Appointments**: See scheduled patients for today
   - **Actions**: Mark appointments as "Complete" or "Cancel"
4. **All Appointments**: View complete appointment history

#### Doctor Daily Routine:
```
Morning:
- Check "Today's Appointments" 
- Review patient details and reasons
- Mark appointments as "Complete" after consultation
- Cancel if patient doesn't show up

Throughout Day:
- Monitor upcoming appointments
- View patient history from previous visits
```

---

### 👤 **PATIENT ROLE**
**Sample Logins**:
- alice.wilson@email.com / password123
- bob.davis@email.com / password123
- carol.martinez@email.com / password123

#### Patient Dashboard Features:
- Book appointments with available doctors
- View appointment history
- See doctor information

#### Patient Workflow Example:
1. **Login as Alice Wilson**
2. **Dashboard** → See personal statistics
3. **Patients Page** → "Book Appointment"
   - **View Available Doctors**: See specializations, fees, experience
   - **Book Appointment**: 
     - Select doctor (e.g., Dr. John Smith - Cardiology)
     - Choose date (today or future)
     - Select time slot (9:00 AM, 10:00 AM, etc.)
     - Enter reason ("Chest pain", "Regular checkup")
     - Click "Book Appointment"
4. **My Appointments**: View booking history and status

#### Patient Booking Process:
```
Step 1: Browse Available Doctors
- Dr. John Smith - Cardiology - ₹200 - 15 years exp
- Dr. Sarah Johnson - Pediatrics - ₹150 - 12 years exp
- Dr. Michael Brown - Orthopedics - ₹250 - 18 years exp

Step 2: Select Appointment Details
- Doctor: Dr. John Smith
- Date: Tomorrow
- Time: 10:00 AM  
- Reason: "Chest pain consultation"

Step 3: Confirm Booking
- Appointment successfully scheduled
- Status: "scheduled" (orange)
```

---

## 📋 **Complete Example Workflow**

### Scenario: Patient Alice books appointment with Dr. John

#### **Patient Side (Alice Wilson)**:
1. Login: alice.wilson@email.com / password123
2. Go to **Patients** page
3. Click **"Book Appointment"**
4. Fill form:
   - Doctor: Dr. John Smith - Cardiology
   - Date: Tomorrow
   - Time: 10:00 AM
   - Reason: "Heart palpitations"
5. Click **"Book Appointment"**
6. See confirmation message
7. Check **"My Appointments"** → Status: "scheduled"

#### **Doctor Side (Dr. John Smith)**:
1. Login: john.smith@hospital.com / password123
2. Go to **Doctors** page (shows "My Appointments")
3. See new appointment in **"Today's Appointments"** (if for today)
4. During consultation:
   - Review patient: Alice Wilson
   - Reason: "Heart palpitations" 
   - Click **"Complete"** button
   - Status changes to "completed" (green)

#### **Admin Side**:
1. Login: admin@hospital.com / password123
2. **Dashboard** → See updated statistics
3. **Appointments** → View all appointments system-wide
4. Monitor hospital operations

---

## 🎯 **Key Features by Page**

### **Dashboard**
- Real-time statistics
- Quick action buttons
- Role-based content

### **Patients Page**
- **For Patients**: Book appointments + view history
- **For Others**: View all patients (admin view)

### **Doctors Page**  
- **For Doctors**: Personal appointment management
- **For Others**: Browse available doctors

### **Appointments Page**
- **For All**: View relevant appointments
- **For Doctors**: Manage appointment status
- **For Admin**: System-wide appointment overview

---

## 📊 **Appointment Status System**
- 🟠 **Scheduled**: Appointment booked, waiting for consultation
- 🟢 **Completed**: Patient consulted, appointment finished  
- 🔴 **Cancelled**: Appointment cancelled by doctor/patient

---

## 🔧 **Sample Data Available**
The system comes pre-loaded with:
- **3 Doctors** (Cardiology, Pediatrics, Orthopedics)
- **3 Patients** (with medical histories)
- **4 Sample Appointments** (today & tomorrow)
- **1 Admin Account**

This allows immediate testing of all features without manual data entry.