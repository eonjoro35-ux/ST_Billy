import { Request, Response } from 'express'
import { query } from '../db/db'

export const getEvents = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const offset = (page - 1) * limit

    const result = await query(
      'SELECT * FROM events ORDER BY date DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    )

    const countResult = await query('SELECT COUNT(*) FROM events')
    const total = parseInt(countResult.rows[0].count)

    res.json({
      data: result.rows,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Get events error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const getEventById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const result = await query('SELECT * FROM events WHERE id = $1', [id])

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Event not found' })
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error('Get event error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const createEvent = async (req: Request, res: Response) => {
  try {
    const { title, description, date, time, location, category } = req.body

    if (!title || !description || !date || !time || !location) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const result = await query(
      'INSERT INTO events (title, description, date, time, location, category) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, description, date, time, location, category]
    )

    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error('Create event error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { title, description, date, time, location, category } = req.body

    const result = await query(
      'UPDATE events SET title = $1, description = $2, date = $3, time = $4, location = $5, category = $6, updated_at = CURRENT_TIMESTAMP WHERE id = $7 RETURNING *',
      [title, description, date, time, location, category, id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Event not found' })
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error('Update event error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const result = await query('DELETE FROM events WHERE id = $1 RETURNING *', [id])

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Event not found' })
    }

    res.json({ message: 'Event deleted successfully' })
  } catch (error) {
    console.error('Delete event error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
