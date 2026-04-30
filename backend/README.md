student-tracking-system-backend/
│
├── src/
│   ├── config/                # Config files
│   │   ├── db.js
│   │   ├── env.js
│   │   └── constants.js
│   │
│   ├── modules/               # Feature-based modules (BEST PRACTICE)
│   │   ├── auth/
│   │   ├── users/
│   │   ├── classes/
│   │   ├── enrollments/
│   │   ├── assignments/
│   │   ├── submissions/
│   │   ├── grades/
│   │   ├── goals/
│   │   ├── materials/
│   │   └── activityLogs/
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── role.middleware.js
│   │   ├── error.middleware.js
│   │   └── validation.middleware.js
│   │
│   ├── utils/
│   │   ├── hash.js
│   │   ├── jwt.js
│   │   └── response.js
│   │
│   ├── routes/
│   │   └── index.js
│   │
│   ├── app.js
│   └── server.js
│
├── uploads/                  # files (assignments, materials)
├── tests/
├── .env
├── package.json
└── README.md


example:
modules/users/
│
├── user.controller.js
├── user.service.js
├── user.repository.js
├── user.model.js (optional if using ORM)
├── user.routes.js
└── user.validation.js