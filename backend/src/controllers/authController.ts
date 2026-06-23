import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { query } from '../db/db'

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password required' })
    }

    const result = await query('SELECT * FROM users WHERE username = $1', [username])
    const user = result.rows[0]

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash)
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Set session
    if (req.session) {
      req.session.userId = user.id
      req.session.username = user.username
      req.session.role = user.role
    }

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const logout = (req: Request, res: Response) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Logout failed' })
      }
      res.json({ message: 'Logout successful' })
    })
  } else {
    res.json({ message: 'No session' })
  }
}

export const me = (req: Request, res: Response) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ message: 'Not authenticated' })
  }

  res.json({
    id: req.session.userId,
    username: req.session.username,
    role: req.session.role,
  })
}
