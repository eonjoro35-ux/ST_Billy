# School Website - Setup Guide

## Quick Start

Follow these steps to get the school website running on your local machine.

### Prerequisites

- **Node.js** v16+ (Download from https://nodejs.org/)
- **PostgreSQL** v12+ (Download from https://www.postgresql.org/)
- **npm** or **yarn** (comes with Node.js)
- **Git** (optional, for version control)

### Step 1: Create PostgreSQL Database

Open PostgreSQL and run:

```sql
CREATE DATABASE school_website;
```

Or using psql command line:

```bash
createdb school_website
```

### Step 2: Install Frontend Dependencies

```bash
cd frontend
npm install
```

### Step 3: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 4: Configure Backend Environment

Edit `backend/.env` file and update:

```env
DB_HOST=localhost           # Your PostgreSQL host
DB_PORT=5432               # Your PostgreSQL port
DB_USER=postgres           # Your PostgreSQL username
DB_PASSWORD=password       # Your PostgreSQL password
DB_NAME=school_website     # Database name
SESSION_SECRET=your-random-secret-key
```

### Step 5: Initialize Database

Run migrations to create tables and seed data:

```bash
cd backend
npm run migrate
```

This will:

- Create all required database tables
- Create a default admin user
  - **Username**: `admin`
  - **Password**: `admin123`

### Step 6: Start Frontend (Development)

In a new terminal:

```bash
cd frontend
npm run dev
```

Frontend will be available at: **http://localhost:5173**

### Step 7: Start Backend (Development)

In another terminal:

```bash
cd backend
npm run dev
```

Backend API will be available at: **http://localhost:5000**

## Verify Setup

1. Open http://localhost:5173 in your browser
2. You should see the school website homepage
3. Click "Admin" or go to http://localhost:5173/login
4. Login with:
   - Username: `admin`
   - Password: `admin123`
5. You should see the admin dashboard

## Project Structure

- **frontend/** - React/Vite frontend application
  - `src/pages/` - Public and admin pages
  - `src/components/` - Reusable components
  - `src/services/` - API calls
  - `src/types/` - TypeScript types

- **backend/** - Express.js API server
  - `src/routes/` - API endpoints
  - `src/controllers/` - Business logic
  - `src/db/` - Database configuration
  - `src/middleware/` - Auth and other middleware

## Available Scripts

### Frontend

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend

```bash
npm run dev      # Start development server with hot reload
npm run build    # Compile TypeScript to JavaScript
npm start        # Run compiled JavaScript
npm run migrate  # Initialize database
```

## Default Admin Credentials

- **Username**: `admin`
- **Password**: `admin123`

⚠️ **IMPORTANT**: Change these credentials after first login in production!

## Troubleshooting

### Database Connection Error

**Problem**: "connect ECONNREFUSED 127.0.0.1:5432"

**Solution**:

1. Make sure PostgreSQL is running
2. Check database credentials in `.env`
3. Verify database exists: `createdb school_website`

### Port Already in Use

**Problem**: "Error: listen EADDRINUSE: address already in use :::5000"

**Solution**:

- Change PORT in `backend/.env`
- Or kill the process using the port

### Frontend Cannot Connect to Backend

**Problem**: "Network Error" or "Failed to fetch"

**Solution**:

1. Ensure backend is running on http://localhost:5000
2. Check `VITE_API_URL` in `frontend/.env`
3. Check CORS settings in `backend/src/app.ts`

## Production Deployment

### Frontend Build

```bash
cd frontend
npm run build
```

Output will be in `frontend/dist/` - deploy to web server or CDN

### Backend Build

```bash
cd backend
npm run build
npm start
```

## Environment Variables Reference

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

### Backend (.env)

```env
NODE_ENV=development
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=school_website
SESSION_SECRET=secret-key-here
FRONTEND_URL=http://localhost:5173
```

## Next Steps

1. ✅ Customize site settings in Admin Panel
2. ✅ Add school logo and images
3. ✅ Update content pages (About, Leadership, etc.)
4. ✅ Create news articles and events
5. ✅ Manage users and permissions

## Support

For detailed information, see:

- [README.md](./README.md) - Project overview
- Frontend code: [frontend/](./frontend/)
- Backend code: [backend/](./backend/)

## Need Help?

Check the following files for more information:

- API Documentation: Backend routes in `src/routes/`
- Database Schema: `backend/src/db/migrations.ts`
- Component Examples: `frontend/src/components/`
