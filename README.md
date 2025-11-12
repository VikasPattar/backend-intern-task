# 🚀 Scalable REST API with Authentication & Role-Based Access

This project demonstrates a **secure**, **scalable REST API** with **JWT-based authentication**, **role-based access control**, and **CRUD operations** for a secondary entity, along with a simple **React.js frontend** to interact with the APIs.

---

## 🧰 Setup Instructions

### 🖥️ Backend Setup

```bash
# Clone the repository
git clone https://github.com/your-username/project-name.git
cd server

# Install dependencies
npm install

# Add environment variables
touch .env

# From the cloned repository, change directory to client
cd client

# Install frontend dependencies
npm install

# In the root repository, run the following commands
npm install
npm start
```
# 🧩 Tech Stack
## 🔧 Backend

Node.js + Express.js

MongoDB (Mongoose ODM)

JWT Authentication

bcrypt.js for password hashing

dotenv for environment configuration

cors and helmet for security

## 🎨 Frontend

React.js

Axios for API calls

Tailwind CSS for basic styling (if used)

React Router for navigation

# ⚙️ Features Implemented
## 🔐 Authentication

User registration and login

Passwords securely hashed using bcrypt

JWT-based authentication with token expiry

Protected routes accessible only with valid JWT

## 👥 Role-Based Access

Two roles: user and admin

admin can perform all CRUD operations

user has restricted access (only their own resources)

## 🗂️ CRUD Operations

Secondary Entity: Tasks

Features:

Create a new task

Get all tasks (admin) or user-specific tasks

Update a task

Delete a task

## 🧰 Validation & Error Handling

Input validation using middleware

Centralized error handler for API responses

Proper HTTP status codes for each operation

## 🔒 Security

Encrypted passwords

Secure token handling in headers/localStorage

Input sanitization

CORS-enabled backend

## 🧮 Database Schema (MongoDB – Mongoose)
👤 User Model
```
{
  username: String,
  email: String,
  password: String, // hashed
  role: { type: String, enum: ["user", "admin"], default: "user" }
}
```
📝 Task Model
```
{
  title: String,
  description: String,
  status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}

```
