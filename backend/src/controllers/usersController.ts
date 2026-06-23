import { Request, Response } from 'express'
import { query } from '../db/db'

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const result = await query(
      'SELECT id, username, email, role, created_at FROM users'
    )
    res.json(result.rows)
  } catch (error) {
    console.error('Get users error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const result = await query(
      'SELECT id, username, email, role, created_at FROM users WHERE id = $1',
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error('Get user error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password, role } = req.body

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const bcrypt = await import('bcryptjs')
    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await query(
      'INSERT INTO users (username, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, username, email, role',
      [username, email, hashedPassword, role || 'user']
    )

    res.status(201).json(result.rows[0])
  } catch (error: any) {
    console.error('Create user error:', error)
    if (error.code === '23505') {
      return res.status(409).json({ message: 'User already exists' })
    }
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { username, email, role } = req.body

    const result = await query(
      'UPDATE users SET username = $1, email = $2, role = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING id, username, email, role',
      [username, email, role, id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error('Update user error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const result = await query('DELETE FROM users WHERE id = $1 RETURNING *', [id])

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('Delete user error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
