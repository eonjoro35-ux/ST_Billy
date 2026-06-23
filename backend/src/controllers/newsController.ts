import { Request, Response } from 'express'
import { query } from '../db/db'

export const getNews = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const offset = (page - 1) * limit

    const result = await query(
      'SELECT * FROM news ORDER BY date DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    )

    const countResult = await query('SELECT COUNT(*) FROM news')
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
    console.error('Get news error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const getNewsById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const result = await query('SELECT * FROM news WHERE id = $1', [id])

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'News not found' })
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error('Get news error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const createNews = async (req: Request, res: Response) => {
  try {
    const { title, content, excerpt, category } = req.body
    const authorId = req.session?.userId

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content required' })
    }

    const result = await query(
      'INSERT INTO news (title, content, excerpt, category, author_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, content, excerpt, category, authorId]
    )

    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error('Create news error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const updateNews = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { title, content, excerpt, category } = req.body

    const result = await query(
      'UPDATE news SET title = $1, content = $2, excerpt = $3, category = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *',
      [title, content, excerpt, category, id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'News not found' })
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error('Update news error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const deleteNews = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const result = await query('DELETE FROM news WHERE id = $1 RETURNING *', [id])

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'News not found' })
    }

    res.json({ message: 'News deleted successfully' })
  } catch (error) {
    console.error('Delete news error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
