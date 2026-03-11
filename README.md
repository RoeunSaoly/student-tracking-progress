# Community Student Progress Tracking System

A full-stack web application for tracking and managing student progress in a learning community. The system allows administrators and mentors to monitor student performance, manage courses, record attendance, and generate reports.

The project uses a **modern containerized architecture** with:

- **Frontend:** Next.js + TailwindCSS  
- **Backend:** Express.js (Node.js REST API)  
- **Database:** MySQL  
- **Containerization:** Docker + Docker Compose  

---

# Table of Contents

- Project Overview
- System Architecture
- Tech Stack
- Features
- Project Structure
- Database Schema
- Installation
- Running with Docker
- Development Setup
- API Endpoints
- Future Improvements

---

# Project Overview

The **Community Student Progress Tracking System** is designed to help learning communities, training centers, or educational organizations manage student learning progress.

Users can:

- Register and login
- Manage students and courses
- Track attendance and scores
- Monitor learning progress
- View dashboards and reports

---

# System Architecture


Browser
│
▼
Next.js Frontend (TailwindCSS)
│
▼
Express.js REST API
│
▼
MySQL Database


All services are containerized using **Docker**.

Docker Containers

frontend
backend
mysql


---

# Tech Stack

## Frontend
- Next.js
- TailwindCSS
- Axios

## Backend
- Node.js
- Express.js
- JWT Authentication
- bcrypt password hashing

## Database
- MySQL
- relational schema

## DevOps
- Docker
- Docker Compose

---

# Features

## Authentication
- User registration
- Login system
- JWT authentication
- Role based access

Roles:
- Admin
- Mentor
- Student

## Student Management
- Add student
- Update student
- Delete student
- View student list

## Course Management
- Create course
- Assign students to courses

## Progress Tracking
- Record student scores
- Track attendance
- Update progress records

## Dashboard
- Student progress overview
- Course statistics
- Performance monitoring

---

# Project Structure

```bash


student-progress-tracker
│
├── docker-compose.yml
├── README.md
│
├── frontend
│ ├── app
│ │ ├── login
│ │ ├── dashboard
│ │ ├── students
│ │ ├── courses
│ │ └── progress
│ │
│ ├── components
│ │ ├── Navbar.tsx
│ │ ├── Sidebar.tsx
│ │ └── ProgressTable.tsx
│ │
│ ├── services
│ │ └── api.ts
│ │
│ ├── styles
│ │ └── globals.css
│ │
│ ├── tailwind.config.js
│ ├── package.json
│ └── Dockerfile
│
├── backend
│ ├── src
│ │ ├── server.js
│ │ │
│ │ ├── config
│ │ │ └── db.js
│ │ │
│ │ ├── controllers
│ │ │ ├── authController.js
│ │ │ ├── studentController.js
│ │ │ ├── courseController.js
│ │ │ └── progressController.js
│ │ │
│ │ ├── routes
│ │ │ ├── authRoutes.js
│ │ │ ├── studentRoutes.js
│ │ │ ├── courseRoutes.js
│ │ │ └── progressRoutes.js
│ │ │
│ │ ├── middleware
│ │ │ ├── authMiddleware.js
│ │ │ └── errorMiddleware.js
│ │ │
│ │ └── models
│ │ ├── studentModel.js
│ │ ├── courseModel.js
│ │ └── progressModel.js
│ │
│ ├── package.json
│ └── Dockerfile
│
└── database
└── init.sql

```


---

# Database Schema

## Users

users

id
name
email
password
role
created_at


## Students

students

id
name
email
community


## Courses

courses

id
title
description


## Progress

progress

id
student_id
course_id
score
attendance
updated_at


Relationships:


students 1 --- N progress
courses 1 --- N progress


---

# Installation

Clone the repository:


git clone https://github.com/yourusername/student-progress-tracker.git

cd student-progress-tracker


---

# Running with Docker

Build and start containers:


docker-compose up --build


Services will run on:

Frontend


http://localhost:3000


Backend API


http://localhost:5000


MySQL


localhost:3306


---

# Development Setup

## Backend


cd backend
npm install
npm run dev


## Frontend


cd frontend
npm install
npm run dev


---

# API Endpoints

## Authentication


POST /api/auth/register
POST /api/auth/login


## Students


GET /api/students
POST /api/students
GET /api/students/:id
PUT /api/students/:id
DELETE /api/students/:id


## Courses


GET /api/courses
POST /api/courses


## Progress


GET /api/progress/:studentId
POST /api/progress
PUT /api/progress/:id


---

# Environment Variables

Create `.env` file in backend:


PORT=5000
DB_HOST=mysql
DB_USER=root
DB_PASSWORD=root
DB_NAME=progress_db
JWT_SECRET=secretkey


---

# Future Improvements

- Role based dashboard
- Data visualization charts
- File uploads for assignments
- Redis caching
- WebSocket real-time updates
- Export reports (PDF / Excel)
- CI/CD pipeline
- Production Docker deployment

---

# License

This project is for **educational and community use**.

---

# Author

Community Student Progress Tracking System  
Built with Next.js, Express.js, MySQL, and Docker.