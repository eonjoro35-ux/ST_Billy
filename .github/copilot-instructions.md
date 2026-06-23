# School Website Project - Copilot Instructions

## Project Overview

Full-stack school website with React Vite frontend (TypeScript), Node.js Express backend (TypeScript), and PostgreSQL database. Includes admin dashboard for dynamic content management.

## Tech Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL
- **Authentication**: Session-based

## Setup Progress

### ✅ Step 1: Project Structure Created

- Complete React + Vite frontend with all pages and components
- Complete Express backend with routes, controllers, and middleware
- Database migration scripts and configuration
- All 10 public pages implemented
- Full admin dashboard with management features

### ✅ Step 2: Environment Configuration

- `.env.example` files created for both frontend and backend
- Default `.env` files created with development settings
- TypeScript configurations complete
- All necessary imports and dependencies configured

### ⏳ Step 3: Install Dependencies

```bash
# Frontend
cd frontend && npm install

# Backend
cd backend && npm install
```

### ⏳ Step 4: Database Setup

- Ensure PostgreSQL is installed and running
- Create database: `createdb school_website`
- Run migrations: `npm run migrate` (from backend folder)
- Seed admin user (username: admin, password: admin123)

### ⏳ Step 5: Start Development Servers

```bash
# Terminal 1: Frontend
cd frontend && npm run dev

# Terminal 2: Backend
cd backend && npm run dev
```

### ⏳ Step 6: Access Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api
- Admin Panel: http://localhost:5173/admin
- Login: admin / admin123

## File Structure

```
ST.Billy/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── services/
│   │   ├── types/
│   │   ├── hooks/
│   │   └── App.tsx
│   ├── package.json
│   └── tsconfig.json
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── middleware/
│   │   ├── db/
│   │   └── app.ts
│   ├── package.json
│   └── tsconfig.json
└── .github/
    └── copilot-instructions.md
```

## Key Features Implemented

- 10 Main Pages (Home, About, Leadership, Academic Programs, Departments, Admissions, News, Events, Gallery, Contact)
- Admin Dashboard with Content Management
- Session-based Authentication
- Responsive Design with Tailwind CSS
- TypeScript for type safety
