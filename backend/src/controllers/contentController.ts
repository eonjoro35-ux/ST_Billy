import { Request, Response } from 'express'
import { query } from '../db/db'

export const getSettings = async (_req: Request, res: Response) => {
  try {
    const result = await query('SELECT key, value FROM site_settings')
    const settings: Record<string, string> = {}
    result.rows.forEach((row: any) => {
      settings[row.key] = row.value
    })
    res.json(settings)
  } catch (error) {
    console.error('Get settings error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const updateSettings = async (req: Request, res: Response) => {
  try {
    const settings = req.body

    for (const [key, value] of Object.entries(settings)) {
      await query(
        'INSERT INTO site_settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = $2, updated_at = CURRENT_TIMESTAMP',
        [key, value]
      )
    }

    res.json({ message: 'Settings updated successfully' })
  } catch (error) {
    console.error('Update settings error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const getHomepage = async (_req: Request, res: Response) => {
  try {
    const result = await query("SELECT * FROM pages WHERE slug = 'homepage'")
    if (result.rows.length === 0) {
      return res.json({ sections: {} })
    }
    res.json(result.rows[0])
  } catch (error) {
    console.error('Get homepage error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const getPageBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params
    const result = await query('SELECT * FROM pages WHERE slug = $1', [slug])

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Page not found' })
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error('Get page error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const updatePage = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params
    const { title, content, sections } = req.body

    const result = await query(
      'UPDATE pages SET title = $1, content = $2, sections = $3, updated_at = CURRENT_TIMESTAMP WHERE slug = $4 RETURNING *',
      [title, content, sections ? JSON.stringify(sections) : null, slug]
    )

    if (result.rows.length === 0) {
      // Create new page if doesn't exist
      const createResult = await query(
        'INSERT INTO pages (slug, title, content, sections) VALUES ($1, $2, $3, $4) RETURNING *',
        [slug, title, content, sections ? JSON.stringify(sections) : null]
      )
      return res.status(201).json(createResult.rows[0])
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error('Update page error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const updateSection = async (req: Request, res: Response) => {
  try {
    const { page, section } = req.params
    const data = req.body

    const pageResult = await query('SELECT * FROM pages WHERE slug = $1', [page])
    const currentSections = pageResult.rows[0]?.sections || {}

    const updatedSections = {
      ...currentSections,
      [section]: data,
    }

    const result = await query(
      'UPDATE pages SET sections = $1, updated_at = CURRENT_TIMESTAMP WHERE slug = $2 RETURNING *',
      [JSON.stringify(updatedSections), page]
    )

    res.json(result.rows[0])
  } catch (error) {
    console.error('Update section error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
