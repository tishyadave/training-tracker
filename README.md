	
└── backend/                          # not started — build after frontend is functional on mock data
    ├── package.json
    └── src/
        ├── app.js
        ├── server.js
        ├── config/
        │   ├── db.js                 # Prisma client instance
        │   └── env.js
        ├── controllers/
        │   ├── auth.controller.js        # login, logout, getMe
        │   ├── dashboard.controller.js   # getStats, getProgressMatrix
        │   ├── course.controller.js      # getAll, getById, create, update, delete
        │   ├── candidate.controller.js   # getAll, getById, create, update, delete, resetPassword
        │   ├── progress.controller.js    # updateStatus, updateCompletionDate
        │   └── log.controller.js         # create, getFeed, getByCandidate
        ├── routes/
        │   ├── index.js               # mounts all routers
        │   ├── auth.routes.js
        │   ├── dashboard.routes.js
        │   ├── course.routes.js
        │   ├── candidate.routes.js
        │   ├── progress.routes.js
        │   └── log.routes.js
        ├── services/                  # business logic, called by controllers
        │   ├── auth.service.js
        │   ├── dashboard.service.js
        │   ├── course.service.js
        │   ├── candidate.service.js
        │   ├── progress.service.js
        │   └── log.service.js
        ├── repositories/              # Prisma queries only, isolated from services
        │   ├── user.repository.js
        │   ├── course.repository.js
        │   ├── candidate.repository.js
        │   ├── progress.repository.js
        │   └── log.repository.js
        ├── middlewares/
        │   ├── auth.middleware.js     # JWT verification
        │   ├── role.middleware.js     # admin/candidate guard
        │   ├── error.middleware.js    # centralized error handler
        │   └── validate.middleware.js # zod request validation
        ├── validators/
        │   ├── auth.validator.js
        │   ├── course.validator.js
        │   ├── candidate.validator.js
        │   ├── progress.validator.js
        │   └── log.validator.js
        └── utils/
            ├── jwt.util.js
            ├── bcrypt.util.js
            └── apiResponse.util.js
    └── prisma/
        └── schema.prisma              # models: User, Candidate, Course, Progress, DailyLog (see Section 5 for shapes)
