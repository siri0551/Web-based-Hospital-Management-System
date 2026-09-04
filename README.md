# 🏥 Web-Based Hospital Management System

A comprehensive **Web-Based Hospital Management System** developed using the **MERN Stack** to digitize and simplify hospital management operations.

The system provides different functionalities for **Administrators, Doctors, and Patients**, including patient management, doctor management, appointment scheduling, authentication, and dashboard management.

---

## 🚀 Live Demo

👉 [Open the Live Application](https://web-based-hospital-management-system-4.onrender.com)

Deployment URL:
https://web-based-hospital-management-system-4.onrender.com

---

## 📌 GitHub Repository

👉 [View Source Code on GitHub](https://github.com/siri0551/Web-based-Hospital-Management-System)

---

## 📖 About the Project

The Web-Based Hospital Management System (WHMS) is a full-stack web application designed to improve the efficiency of hospital administration and healthcare management.

The system provides a centralized platform where administrators, doctors, and patients can manage their respective activities.

Instead of maintaining hospital information manually, the application provides a digital platform for managing:

* Patient information
* Doctor information
* Appointments
* User authentication
* Role-based access
* Hospital management activities
* Dashboard information

The project follows a client-server architecture using "React.js for the frontend, Node.js and Express.js for the backend, and MongoDB for database management".

---

# ✨ Features

## 🔐 Authentication & Authorization

* User registration
* User login
* JWT-based authentication
* Secure password handling
* Role-based access control
* Protected routes
* Separate access for Admin, Doctor, and Patient

---

## 👨‍💼 Admin Management

Administrators can manage the overall hospital system.

### Admin Features

* View dashboard
* Manage doctors
* Manage patients
* Manage appointments
* View hospital statistics
* Manage user information
* Access administrative functionalities

---

## 👨‍⚕️ Doctor Management

Doctors can access their relevant hospital information.

### Doctor Features

* Doctor profile
* View appointments
* Manage appointment information
* Access patient-related information
* View assigned activities

---

## 🧑‍🤝‍🧑 Patient Management

Patients can manage their information and hospital appointments.

### Patient Features

* Patient registration
* Patient profile
* View doctors
* Book appointments
* View appointments
* Manage appointment-related information

---

## 📅 Appointment Management

The system provides appointment management functionality between patients and doctors.

### Appointment Features

* Create appointments
* View appointments
* Manage appointment information
* Update appointment status
* Associate patients with doctors
* Appointment tracking

---

## 📊 Dashboard

The application provides a dashboard for managing and viewing important hospital information.

Dashboard information can include:

* Total patients
* Total doctors
* Appointments
* User information
* System statistics

---

# 🛠️ Technology Stack

## Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* React Router DOM
* Axios

## Backend

* Node.js
* Express.js
* JavaScript
* REST APIs
* JWT Authentication
* bcryptjs
* CORS
* dotenv

## Database

* MongoDB
* Mongoose

## Deployment

* Render

---

# 🏗️ System Architecture

```text
                    ┌────────────────────────┐
                    │         Users          │
                    │                        │
                    │ Admin | Doctor | Patient│
                    └───────────┬────────────┘
                                │
                                ▼
                    ┌────────────────────────┐
                    │    React Frontend      │
                    │                        │
                    │  React Router          │
                    │  Axios                 │
                    │  User Interface        │
                    └───────────┬────────────┘
                                │
                                │ REST API
                                ▼
                    ┌────────────────────────┐
                    │   Node.js + Express    │
                    │        Backend         │
                    │                        │
                    │ Authentication         │
                    │ Middleware              │
                    │ API Routes              │
                    │ Business Logic          │
                    └───────────┬────────────┘
                                │
                                ▼
                    ┌────────────────────────┐
                    │        MongoDB         │
                    │                        │
                    │ Users                  │
                    │ Doctors                │
                    │ Patients               │
                    │ Appointments            │
                    └────────────────────────┘
```

---

# 📂 Project Structure

```text
Web-based-Hospital-Management-System/
│
├── backend/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── clearDatabase.js
│   ├── fixAppointments.js
│   ├── seedData.js
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── .env.example
│   ├── .env.production
│   ├── package.json
│   └── package-lock.json
│
├── README.md
├── SETUP.md
├── USER_GUIDE.md
├── index.html
└── .gitignore
```

---

# ⚙️ Installation & Setup

## Prerequisites

Make sure the following are installed on your system:

* Node.js
* npm
* MongoDB
* Git
* MongoDB Compass (optional)

---

# 📥 Clone the Repository

```bash
git clone https://github.com/siri0551/Web-based-Hospital-Management-System.git
```

Navigate to the project:

```bash
cd Web-based-Hospital-Management-System
```

---

# 🔧 Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Install the required dependencies:

```bash
npm install
```

Start the backend:

```bash
npm start
```

For development:

```bash
npm run dev
```

---

# 🗄️ Database Configuration

The application uses **MongoDB** as the database.

For a local MongoDB installation, the connection can be configured using:

```env
MONGODB_URI=mongodb://localhost:27017/hospital_management
```

Create a `.env` file inside the `backend` directory.

Example:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
PORT=5000
```

### Important

Do not upload your `.env` file containing database credentials or secret keys to GitHub.

---

# 💻 Frontend Setup

Open another terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm start
```

The frontend will run locally at:

```text
http://localhost:3000
```

---

# 🌐 Local Development

When running the application locally:

### Frontend

```text
http://localhost:3000
```

### Backend

```text
http://localhost:5000
```

---

# 🔌 API Endpoints

The application provides REST APIs for authentication, doctors, patients, and appointments.

## Authentication

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login user          |

## Patients

| Method | Endpoint        | Description             |
| ------ | --------------- | ----------------------- |
| GET    | `/api/patients` | Get patient information |
| POST   | `/api/patients` | Create a patient        |

## Doctors

| Method | Endpoint       | Description            |
| ------ | -------------- | ---------------------- |
| GET    | `/api/doctors` | Get doctor information |
| POST   | `/api/doctors` | Create a doctor        |

## Appointments

| Method | Endpoint                | Description           |
| ------ | ----------------------- | --------------------- |
| GET    | `/api/appointments`     | Get appointments      |
| POST   | `/api/appointments`     | Create an appointment |
| PUT    | `/api/appointments/:id` | Update an appointment |

---

# 🔐 Authentication Flow

The system uses **JWT (JSON Web Token)** authentication.

```text
                 User
                  │
                  ▼
          Login / Register
                  │
                  ▼
       Backend Authentication
                  │
                  ▼
             JWT Token
                  │
                  ▼
       Authenticated Request
                  │
                  ▼
        Protected API Routes
                  │
                  ▼
          Authorized Resource
```

Passwords are securely handled using **bcryptjs**, while JWT tokens are used to authenticate users.

---

# 👥 User Roles

| Role             | Responsibilities                                              |
| ---------------- | ------------------------------------------------------------- |
| 👨‍💼 Admin      | Manage doctors, patients, appointments and system information |
| 👨‍⚕️ Doctor     | Manage profile and view/manage appointments                   |
| 🧑‍🤝‍🧑 Patient | Manage profile and appointments                               |

---

# 🚀 Deployment

The complete application is deployed and accessible through a single URL.

## Live Application

👉 **https://web-based-hospital-management-system-4.onrender.com**

The application is hosted using **Render**.

---

# 🔄 Deployment Architecture

```text
                 Internet
                     │
                     ▼
       ┌──────────────────────────┐
       │          Render          │
       │                          │
       │  Web-Based Hospital      │
       │  Management System       │
       └────────────┬─────────────┘
                    │
          ┌─────────┴─────────┐
          ▼                   ▼
   Frontend / UI        Backend / API
          │                   │
          └─────────┬─────────┘
                    │
                    ▼
                MongoDB
```

---

# 🧪 Testing

To test the application locally:

```bash
cd frontend
npm test
```

You can also test the deployed application using:

👉 **[Live Application](https://web-based-hospital-management-system-4.onrender.com)**

Recommended testing flow:

1. Open the application.
2. Register a user.
3. Login.
4. Check the dashboard.
5. Test patient functionality.
6. Test doctor functionality.
7. Create an appointment.
8. View and update appointment information.
9. Test role-based functionality.

---

# 🔒 Security

The application implements authentication and authorization mechanisms to protect user data.

Security practices include:

* JWT authentication
* Password hashing using bcryptjs
* Protected routes
* Role-based authorization
* Environment variables for sensitive configuration
* MongoDB database security

For production environments:

* Use HTTPS.
* Use strong JWT secrets.
* Protect MongoDB credentials.
* Configure appropriate CORS policies.
* Never expose `.env` files.
* Validate user input.

---

# 📸 Screenshots

Add screenshots of the application here to make the GitHub repository more attractive.

Example:

```markdown
## Screenshots

### Login Page

![Login Page](screenshots/login.png)

### Dashboard

![Dashboard](screenshots/dashboard.png)

### Patient Management

![Patient Management](screenshots/patients.png)

### Doctor Management

![Doctor Management](screenshots/doctors.png)

### Appointment Management

![Appointment Management](screenshots/appointments.png)
```

---

# 🔮 Future Enhancements

The system can be further enhanced with:

* 💊 Medicine inventory management
* 💰 Billing and payment management
* 📄 Medical reports
* 🩺 Prescription management
* 📧 Email notifications
* 📱 SMS notifications
* 🔔 Appointment reminders
* 📊 Advanced analytics
* 📅 Doctor availability management
* 🗂️ Electronic medical records
* 🔐 Two-factor authentication
* 🏥 Department management

---

# 🤝 Contributing

Contributions are welcome.

### 1. Fork the repository

### 2. Clone your fork

```bash
git clone https://github.com/siri0551/Web-based-Hospital-Management-System.git
```

### 3. Create a new branch

```bash
git checkout -b feature/new-feature
```

### 4. Make your changes

### 5. Commit your changes

```bash
git add .
git commit -m "Add new feature"
```

### 6. Push your changes

```bash
git push origin feature/new-feature
```

### 7. Create a Pull Request

---

# 📚 Documentation

Additional documentation is available in the repository:

* **SETUP.md** – Project setup and configuration
* **USER_GUIDE.md** – User guide and application instructions

---

# 👨‍💻 Author

**Siri0551**

### GitHub

👉 [GitHub Profile](https://github.com/siri0551)

### Project Repository

👉 [Web-Based Hospital Management System](https://github.com/siri0551/Web-based-Hospital-Management-System)

### Live Application

👉 [Open Hospital Management System](https://web-based-hospital-management-system-4.onrender.com)

---

# ⭐ Support

If you find this project useful, please consider giving the repository a ⭐ on GitHub.

---

## 🏥 Web-Based Hospital Management System

Built with  using the MERN Stack

React.js • Node.js • Express.js • MongoDB • JWT • Render
