# 🐞 Bug Tracker Web App

A full-stack **Bug Tracking Web Application** built using the **MERN stack** with **Role-Based Access Control (RBAC)**, **JWT authentication**, and a complete **bug workflow lifecycle**.

This project simulates a real-world software development environment where testers report bugs, developers resolve them, and admins manage assignments.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access control (RBAC)
- Secure login & protected routes

### 👥 User Roles
- **Tester**
  - Create bugs
  - View bug status
- **Developer**
  - Update bug status (Open → In Progress → Resolved → Closed)
- **Admin**
  - Assign bugs to developers
  - Full access to all features

### 🐛 Bug Management
- Create bugs with title, description, and priority
- Status lifecycle tracking
- Assign bugs to developers
- Filter bugs by status
- Priority tagging (Low, Medium, High, Critical)

### 🖥️ UI & UX
- Modern dashboard layout
- Status & priority badges
- Role-specific actions
- Clean and responsive UI

---

## 🧱 Tech Stack

### Frontend
- React
- Axios
- React Router
- CSS (custom dashboard styling)

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- RESTful APIs

---

⚙️ Setup Instructions

1️⃣ Clone the Repository

- git clone https://github.com/your-username/Bug-Tracker-Web-App.git
- cd bug-tracker

2️⃣ Backend Setup

- cd backend
- npm install
- npm run dev

Create a .env file inside backend:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

Backend runs on:
http://localhost:5000

3️⃣ Frontend Setup

- cd frontend
- npm install
- npm start

Frontend runs on:
http://localhost:3000

🔄 Bug Workflow

Open → In Progress → Resolved → Closed

Only developers/admins can update status

Only admins can assign bugs

Invalid transitions are blocked by backend validation

📌 API Endpoints

Authentication
| Method | Endpoint       | Description   |
| ------ | -------------- | ------------- |
| POST   | /auth/register | Register user |
| POST   | /auth/login    | Login user    |

Bugs
| Method | Endpoint         | Description             |
| ------ | ---------------- | ----------------------- |
| GET    | /bugs            | Fetch all bugs          |
| POST   | /bugs            | Create a bug            |
| PATCH  | /bugs/:id/status | Update bug status       |
| PATCH  | /bugs/:id/assign | Assign bug to developer |


Users
| Method | Endpoint              | Description                   |
| ------ | --------------------- | ----------------------------- |
| GET    | /users?role=developer | Fetch developers (admin only) |

🎯 Why This Project Matters

- Demonstrates real-world full-stack engineering
- Covers RBAC, JWT, REST APIs
- Clean and scalable backend architecture
- Strong system design foundation

🔮 Future Enhancements

- Bug comments & activity logs
- Email notifications
- File attachments
- Advanced search & analytics
- Docker + CI/CD
- Cloud deployment (AWS / Azure)


