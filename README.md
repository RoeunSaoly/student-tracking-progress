# Student Tracking Progress

Full-stack student progress tracking system for admins, teachers, and students. The application manages classes, enrollments, assignments, submissions, grades, learning goals, messaging, notifications, teacher verification, dashboard analytics, and audit logs.

## Tech Stack

### Frontend

- Next.js 15 with React 19 and TypeScript
- Tailwind CSS 4
- Axios for API calls
- Socket.IO client for realtime updates
- Recharts, Framer Motion, Headless UI, Heroicons, Lucide React

### Backend

- Node.js with Express 5
- MySQL with Sequelize models and raw SQL setup scripts
- JWT authentication and role/permission authorization
- Joi validation
- Multer file uploads
- Socket.IO realtime server
- Swagger UI API documentation

## Project Structure

```text
student-tracking-progress/
  backend/
    database/schema.sql          Raw MySQL schema used by migration script
    src/app/                     Express app, routes, server, Socket.IO setup
    src/config/                  Environment and database configuration
    src/database/                Sequelize models, migrations, seeders
    src/docs/swagger.js          Swagger/OpenAPI configuration
    src/modules/                 Domain modules and route handlers
    src/scripts/                 Database migrate, seed, and reset scripts
    src/shared/                  Shared middleware, repositories, and utilities
    uploads/                     Local uploaded files served by the API
  frontend/
    src/app/                     Next.js App Router pages and layouts
    src/components/              Layout, dashboard, UI, and feature components
    src/context/                 Auth context
    src/hooks/                   Navigation and dashboard hooks
    src/lib/                     Axios and Socket.IO clients
    src/services/                API service wrappers
```

## Main Features

- Authentication with JWT access/refresh tokens.
- Role-based dashboards for admin, teacher, and student users.
- Admin user management, teacher request review, system logs, analytics, classes, and assignments.
- Teacher class management, student lists, materials, assignments, submissions, grading, messages, and notifications.
- Student class enrollment, assignment submission, progress tracking, goals, messages, and notifications.
- File uploads for avatars, materials, submissions, messages, and teacher verification documents.
- Swagger documentation at `/api-docs`.
- Realtime support through Socket.IO.

## Prerequisites

- Node.js 20 or newer
- npm
- MySQL server

## Environment Variables

Create `backend/.env` before running backend scripts:

```env
NODE_ENV=development
PORT=5002

DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=student_tracking

JWT_SECRET=replace_with_a_strong_secret
JWT_ACCESS_SECRET=replace_with_a_strong_access_secret
JWT_REFRESH_SECRET=replace_with_a_strong_refresh_secret
JWT_ACCESS_EXPIRATION=1h
JWT_REFRESH_EXPIRATION=7d
```

Create `frontend/.env.local` if the backend is not running at the default URL:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:5002/api
```

The frontend defaults to `http://127.0.0.1:5002/api` or `http://localhost:5002/api` depending on the component.

## Installation

Install backend dependencies:

```bash
cd backend
npm install
```

Install frontend dependencies:

```bash
cd frontend
npm install
```

## Database Setup

From the `backend` directory:

```bash
npm run migrate
```

The migration script connects to MySQL, drops the configured database if it exists, recreates it, applies `database/schema.sql`, seeds roles, permissions, and the admin user.

Optional demo users can be added with:

```bash
npm run seed
```

To fully rebuild the database and seed demo users:

```bash
npm run db:reset
```

Seeded accounts:

| Role | Email | Password |
| --- | --- | --- |
| Admin | `admin@example.com` | `admin123` |
| Teacher | `teacher@example.com` | `teacher123` |
| Student | `student@example.com` | `student123` |

## Running Locally

Start the backend API:

```bash
cd backend
npm run dev
```

Start the frontend:

```bash
cd frontend
npm run dev
```

Default local URLs:

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5002/api`
- Backend health check: `http://localhost:5002`
- Swagger UI: `http://localhost:5002/api-docs`
- Uploaded files: `http://localhost:5002/uploads/...`

## Useful Scripts

### Backend

| Command | Description |
| --- | --- |
| `npm run dev` | Start Express with nodemon |
| `npm start` | Start Express with Node |
| `npm run migrate` | Drop and recreate the database, apply schema, seed admin |
| `npm run seed` | Add demo teacher and student users |
| `npm run db:reset` | Run migration and demo seeding |

### Frontend

| Command | Description |
| --- | --- |
| `npm run dev` | Start Next.js development server with Turbopack |
| `npm run build` | Build the production frontend |
| `npm start` | Start the production Next.js server |
| `npm run lint` | Run ESLint |

## API Route Groups

All API route groups are mounted under `/api`:

- `/auth` - register, login, refresh token
- `/users` - current user, profile, academic record, teacher request
- `/classes` - class CRUD, join requests, enrollments
- `/materials` - class material uploads and management
- `/assignments` - assignment CRUD and student assignment lists
- `/submissions` - assignment submission upload and retrieval
- `/grades` - grade creation and lookup
- `/goals` - student learning goals
- `/messages` - direct messages and announcements
- `/notifications` - notification read/delete actions
- `/dashboard` - role-specific dashboard data
- `/students` - teacher/admin student views
- `/admin` - admin users, teachers, classes, logs, dashboard, assignments, teacher requests
- `/teacher-requests` - teacher verification request workflow

Use Swagger UI at `http://localhost:5002/api-docs` for interactive endpoint documentation.

## Database Tables

The schema includes:

- `users`, `roles`, `permissions`, `role_permissions`, `user_profiles`
- `classes`, `enrollments`, `pending_enrollments`, `materials`
- `assignments`, `submissions`, `grades`, `goals`
- `messages`, `notifications`
- `activity_logs`, `system_logs`, `refresh_tokens`
- `teacher_requests`

## Development Notes

- Backend uploads are stored locally in `backend/uploads`.
- The migration command is destructive because it drops the configured database before recreating it.
- The backend package currently has no automated test suite configured; `npm test` is a placeholder that exits with an error.
- The frontend middleware protects `/student`, `/teacher`, and `/admin` routes by checking auth cookies and role.
