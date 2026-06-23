import { Request, Response, NextFunction } from 'express'

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  next()
}

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  if (req.session.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' })
  }
  next()
}

declare module 'express-session' {
  interface SessionData {
    userId: string
    username: string
    role: string
  }
}
