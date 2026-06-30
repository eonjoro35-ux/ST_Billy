# School Website - Full Stack Application

A comprehensive school website built with React, Vite, TypeScript on the frontend and Node.js, Express, PostgreSQL on the backend.

## Features

### Public Pages

- **Home Page**: Hero banner, school motto, principal's message, statistics, latest news, upcoming events
- **About Us**: School history, mission, vision, values, achievements
- **Leadership**: Principal, deputy, heads of departments, board members
- **Academic Programs**: Early childhood, primary, junior secondary, senior secondary, technical
- **Departments**: Mathematics, ICT, Sciences, Languages, Business Studies
- **Admissions**: Requirements, application process, fees, FAQs
- **News & Blog**: Latest school updates and achievements
- **Events Calendar**: Academic calendar, sports day, graduation, exams
- **Gallery**: Photos and videos organized by category
- **Contact Us**: Contact form, Google Maps, social media links

### Admin Dashboard

- **News Management**: Create, edit, delete news articles
- **Events Management**: Manage school events
- **Users Management**: Manage admin users
- **Settings**: Edit site settings, social links, contact information

## Tech Stack

### Frontend

- React 18 with TypeScript
- Vite for fast development
- Tailwind CSS for styling
- React Router for navigation
- Axios for API calls

### Backend

- Node.js with Express
- TypeScript for type safety
- PostgreSQL for database
- Session-based authentication
- CORS enabled for frontend communication

## Project Structure

```
ST.Billy/
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/
│   │   │   ├── website/      # Public pages
│   │   │   ├── admin/       # Admin pages
│   │   │   └── auth/        # Authentication pages
│   │   ├── layouts/         # Layout components
│   │   ├── services/        # API services
│   │   ├── types/           # TypeScript types
│   │   ├── hooks/           # Custom hooks
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── .env.example
├── backend/
│   ├── src/
│   │   ├── routes/          # API routes
│   │   ├── controllers/      # Route controllers
│   │   ├── middleware/      # Express middleware
│   │   ├── db/
│   │   │   ├── db.ts        # Database connection
│   │   │   └── migrations.ts # Database schema
│   │   ├── config/          # Configuration files
│   │   └── app.ts           # Express app setup
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
└── README.md
```

## Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### 1. Clone and Setup Frontend

```bash
cd frontend
npm install
cp .env.example .env
```

### 2. Clone and Setup Backend

```bash
cd backend
npm install
cp .env.example .env
```

### 3. Configure Backend Environment

Edit `backend/.env`:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
DB_NAME=school_website
SESSION_SECRET=generate-a-random-secret-key
```

### 4. Create PostgreSQL Database

```bash
createdb school_website
```

### 5. Run Database Migrations

```bash
cd backend
npm run migrate
```

This will:

- Create all necessary tables
- Create a default admin user (username: `admin`, password: `admin123`)

### 6. Start Development Servers

**Terminal 1 - Frontend:**

```bash
cd frontend
npm run dev
```

Frontend will be available at `http://localhost:5173`

**Terminal 2 - Backend:**

```bash
cd backend
npm run dev
```

Backend will be available at `http://localhost:5000`

## API Endpoints

### Authentication

- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### News

- `GET /api/news` - Get all news
- `GET /api/news/:id` - Get news by ID
- `POST /api/news` - Create news (admin only)
- `PUT /api/news/:id` - Update news (admin only)
- `DELETE /api/news/:id` - Delete news (admin only)

### Events

- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create event (admin only)
- `PUT /api/events/:id` - Update event (admin only)
- `DELETE /api/events/:id` - Delete event (admin only)

### Content

- `GET /api/content/settings` - Get site settings
- `PUT /api/content/settings` - Update settings (admin only)
- `GET /api/content/pages/:slug` - Get page content
- `PUT /api/content/pages/:slug` - Update page content (admin only)

### Users (Admin only)

- `GET /api/users` - Get all users
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Default Admin Credentials

Username: `admin`
Password: `admin123`

**⚠️ Important: Change these credentials in production!**

## Building for Production

### Frontend

```bash
cd frontend
npm run build
# Output: dist/
```

### Backend

```bash
cd backend
npm run build
npm start
```

## Key Features

✅ Fully responsive design
✅ Dynamic content management through admin panel
✅ Session-based authentication
✅ Type-safe TypeScript codebase
✅ Modern UI with Tailwind CSS
✅ RESTful API architecture
✅ PostgreSQL database with migrations
✅ CORS enabled for cross-origin requests
✅ Professional school website design

## Future Enhancements

- User registration for parents/students
- Email notifications
- File uploads for documents
- Search functionality
- Multi-language support
- Mobile app
- Advanced reporting for admins
- Payment gateway for fees

## License

This project is open source and available under the MIT License.

## Support

For issues and questions, please create an issue in the project repository.
