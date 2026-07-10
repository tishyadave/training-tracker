# Training Tracker

## Project Structure

```text
training-tracker/
│
├── frontend/
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       │
│       ├── lib/
│       │   ├── utils.js                # cn() class merge helper
│       │   └── progress.js             # summarizeCandidate, findProgress, formatDate
│       │
│       ├── mocks/
│       │   ├── seed.js                 # Seed data (courses, candidates, progress, logs)
│       │   └── mockApi.js              # In-memory API layer (matches future backend API)
│       │
│       ├── contexts/
│       │   └── AuthContext.jsx         # Authentication & session management
│       │
│       ├── hooks/
│       │   ├── useCourses.js
│       │   ├── useCandidates.js
│       │   ├── useProgress.js
│       │   └── useLogs.js
│       │
│       ├── routes/
│       │   ├── router.jsx
│       │   └── ProtectedRoute.jsx      # Role-based route protection
│       │
│       ├── layouts/
│       │   ├── AdminLayout.jsx
│       │   ├── CandidateLayout.jsx
│       │   └── AuthLayout.jsx
│       │
│       ├── components/
│       │   ├── ui/
│       │   │   ├── button.jsx
│       │   │   ├── card.jsx
│       │   │   ├── input.jsx
│       │   │   ├── select.jsx
│       │   │   ├── dialog.jsx
│       │   │   └── badge.jsx
│       │   │
│       │   ├── shared/
│       │   │   ├── Sidebar.jsx
│       │   │   ├── StatusBadge.jsx
│       │   │   ├── ProgressRing.jsx
│       │   │   ├── StatCard.jsx
│       │   │   ├── ConfirmDialog.jsx
│       │   │   └── misc.jsx
│       │   │
│       │   ├── admin/
│       │   │   ├── ProgressMatrix.jsx
│       │   │   ├── CourseTable.jsx
│       │   │   ├── CourseFormDialog.jsx
│       │   │   ├── CandidateTable.jsx
│       │   │   ├── CandidateFormDialog.jsx
│       │   │   └── ActivityFeedItem.jsx
│       │   │
│       │   └── candidate/
│       │       ├── TaskTable.jsx
│       │       ├── DailyLogForm.jsx
│       │       └── LogHistoryList.jsx
│       │
│       └── pages/
│           ├── auth/
│           │   └── Login.jsx
│           ├── admin/
│           │   ├── Dashboard.jsx
│           │   ├── TrainingTracker.jsx
│           │   ├── Candidates.jsx
│           │   └── ActivityFeed.jsx
│           └── candidate/
│               ├── MyTasks.jsx
│               └── DailyLog.jsx
│
└── backend/
    ├── package.json
    ├── prisma/
    │   └── schema.prisma              # Database models
    │
    └── src/
        ├── app.js
        ├── server.js
        │
        ├── config/
        │   ├── db.js
        │   └── env.js
        │
        ├── controllers/
        │   ├── auth.controller.js
        │   ├── dashboard.controller.js
        │   ├── course.controller.js
        │   ├── candidate.controller.js
        │   ├── progress.controller.js
        │   └── log.controller.js
        │
        ├── routes/
        │   ├── index.js
        │   ├── auth.routes.js
        │   ├── dashboard.routes.js
        │   ├── course.routes.js
        │   ├── candidate.routes.js
        │   ├── progress.routes.js
        │   └── log.routes.js
        │
        ├── services/
        │   ├── auth.service.js
        │   ├── dashboard.service.js
        │   ├── course.service.js
        │   ├── candidate.service.js
        │   ├── progress.service.js
        │   └── log.service.js
        │
        ├── repositories/
        │   ├── user.repository.js
        │   ├── course.repository.js
        │   ├── candidate.repository.js
        │   ├── progress.repository.js
        │   └── log.repository.js
        │
        ├── middlewares/
        │   ├── auth.middleware.js
        │   ├── role.middleware.js
        │   ├── error.middleware.js
        │   └── validate.middleware.js
        │
        ├── validators/
        │   ├── auth.validator.js
        │   ├── course.validator.js
        │   ├── candidate.validator.js
        │   ├── progress.validator.js
        │   └── log.validator.js
        │
        └── utils/
            ├── jwt.util.js
            ├── bcrypt.util.js
            └── apiResponse.util.js
```

## Architecture

### Frontend
- **React + Vite**
- **Tailwind CSS**
- Custom UI components inspired by **shadcn/ui**
- Mock API for frontend-first development
- Role-based routing (Admin & Candidate)

### Backend
- **Node.js + Express**
- **Prisma ORM**
- **JWT Authentication**
- **Role-based Authorization**
- Layered Architecture:
  - Controllers
  - Services
  - Repositories
  - Validators
  - Middlewares

## Database Models

- User
- Candidate
- Course
- Progress
- DailyLog
