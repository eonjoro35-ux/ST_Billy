import express, { Express, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import session from 'express-session'
import dotenv from 'dotenv'

// Import routes
import authRoutes from './routes/auth'
import newsRoutes from './routes/news'
import eventsRoutes from './routes/events'
import usersRoutes from './routes/users'
import contentRoutes from './routes/content'

dotenv.config()

const app: Express = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
  },
}))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/news', newsRoutes)
app.use('/api/events', eventsRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/content', contentRoutes)

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'OK' })
})

// Error handling middleware
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err)
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {},
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})

export default app
