Course Management Application

A full-stack Course Management Application built using React, Node.js, Express, SQLite, and JWT authentication.
Tech Stack

Frontend: React (Vite), JavaScript, CSS
Backend: Node.js, Express, SQLite
Auth: JWT, bcrypt

Features:
User Registration & Login
JWT-based Authentication
Protected Routes
Add, View, Delete Courses
Logout functionality

Setup Instructions:

Backend
cd backend
npm install
npx nodemon server.js
Runs on: http://localhost:5000

Frontend
cd frontend
npm install
npm run dev
Runs on: http://localhost:5173

API Endpoints:
Auth
POST /api/auth/register

POST /api/auth/login

Courses (Protected)

GET /api/courses

POST /api/courses

DELETE /api/courses/:id

Project Structure
backend/   → API & Database
frontend/  → React UI
