// Mock In-Memory Database for Development/Testing
// Replace with real PostgreSQL when ready

import { v4 as uuidv4 } from 'uuid'

const database = {
  users: [
    {
      id: '550e8400-e29b-41d4-a716-446655440001',
      username: 'admin',
      email: 'admin@school.com',
      password_hash: '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36gZvWFm',
      role: 'admin',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  news: [
    {
      id: uuidv4(),
      title: 'Welcome to ST. Billy School',
      content: 'We are excited to welcome you to our school website!',
      excerpt: 'Welcome message from our school',
      image_url: 'https://via.placeholder.com/600x400?text=Welcome+to+ST.+Billy',
      category: 'general',
      date: new Date().toISOString(),
      author_id: '550e8400-e29b-41d4-a716-446655440001',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  events: [
    {
      id: uuidv4(),
      title: 'School Assembly',
      description: 'Monthly school assembly for all students and staff',
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: '09:00',
      location: 'Main Auditorium',
      image_url: 'https://via.placeholder.com/600x400?text=Assembly',
      category: 'assembly',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  banners: [
    {
      id: uuidv4(),
      title: 'Main Banner',
      image_url: 'https://via.placeholder.com/1200x400?text=Welcome+to+ST.+Billy+School',
      subtitle: 'Inspiring Minds, Shaping Futures',
      order: 1,
      active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  pages: [
    {
      id: uuidv4(),
      slug: 'homepage',
      title: 'Home',
      content: 'Welcome to our school',
      sections: JSON.stringify({}),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  site_settings: [
    {
      id: uuidv4(),
      key: 'site_name',
      value: 'ST. Billy School',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      key: 'site_email',
      value: 'info@stbilly.com',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      key: 'site_phone',
      value: '+1-234-567-8900',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
}

interface QueryResult {
  rows: any[]
}

export async function query(text: string, values?: any[]): Promise<QueryResult> {
  const lowerText = text.toLowerCase()

  try {
    // BANNERS
    if (lowerText.includes('select') && lowerText.includes('from banners')) {
      if (lowerText.includes('where id')) {
        const id = values?.[0]
        return { rows: database.banners.filter((b: any) => b.id === id) }
      }
      if (lowerText.includes('order by')) {
        return { rows: database.banners.sort((a: any, b: any) => a.order - b.order) }
      }
      return { rows: database.banners }
    }

    if (lowerText.includes('insert into banners')) {
      const newBanner = {
        id: uuidv4(),
        title: values?.[0],
        image_url: values?.[1],
        subtitle: values?.[2],
        order: values?.[3] || database.banners.length + 1,
        active: values?.[4] !== false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      database.banners.push(newBanner)
      return { rows: [newBanner] }
    }

    if (lowerText.includes('update banners') && lowerText.includes('where id')) {
      const id = values?.[values.length - 1]
      const index = database.banners.findIndex((b: any) => b.id === id)
      if (index > -1) {
        database.banners[index] = {
          ...database.banners[index],
          title: values?.[0] || database.banners[index].title,
          image_url: values?.[1] || database.banners[index].image_url,
          subtitle: values?.[2] || database.banners[index].subtitle,
          updated_at: new Date().toISOString(),
        }
        return { rows: [database.banners[index]] }
      }
    }

    if (lowerText.includes('delete from banners')) {
      const id = values?.[0]
      const index = database.banners.findIndex((b: any) => b.id === id)
      if (index > -1) {
        const deleted = database.banners.splice(index, 1)
        return { rows: deleted }
      }
    }

    // USERS
    if (lowerText.includes('select') && lowerText.includes('from users')) {
      if (lowerText.includes('where username')) {
        const username = values?.[0]
        return { rows: database.users.filter(u => u.username === username) }
      }
      return { rows: database.users }
    }

    // NEWS
    if (lowerText.includes('select') && lowerText.includes('from news')) {
      if (lowerText.includes('where id')) {
        const id = values?.[0]
        return { rows: database.news.filter(n => n.id === id) }
      }
      if (lowerText.includes('order by date desc')) {
        const limit = values?.[0] || 10
        const offset = values?.[1] || 0
        return { rows: database.news.slice(offset, offset + limit).sort((a: any, b: any) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        )}
      }
      return { rows: database.news }
    }

    if (lowerText.includes('count') && lowerText.includes('from news')) {
      return { rows: [{ count: String(database.news.length) }] }
    }

    if (lowerText.includes('insert into news')) {
      const newNews = {
        id: uuidv4(),
        title: values?.[0],
        content: values?.[1],
        excerpt: values?.[2],
        category: values?.[3],
        author_id: values?.[4],
        image_url: values?.[5] || 'https://via.placeholder.com/600x400',
        date: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      database.news.push(newNews)
      return { rows: [newNews] }
    }

    if (lowerText.includes('update news') && lowerText.includes('where id')) {
      const id = values?.[values.length - 1]
      const index = database.news.findIndex(n => n.id === id)
      if (index > -1) {
        database.news[index] = {
          ...database.news[index],
          title: values?.[0] || database.news[index].title,
          content: values?.[1] || database.news[index].content,
          excerpt: values?.[2] || database.news[index].excerpt,
          category: values?.[3] || database.news[index].category,
          updated_at: new Date().toISOString(),
        }
        return { rows: [database.news[index]] }
      }
    }

    if (lowerText.includes('delete from news')) {
      const id = values?.[0]
      const index = database.news.findIndex(n => n.id === id)
      if (index > -1) {
        const deleted = database.news.splice(index, 1)
        return { rows: deleted }
      }
    }

    // EVENTS
    if (lowerText.includes('select') && lowerText.includes('from events')) {
      if (lowerText.includes('where id')) {
        const id = values?.[0]
        return { rows: database.events.filter(e => e.id === id) }
      }
      if (lowerText.includes('order by date desc')) {
        const limit = values?.[0] || 10
        const offset = values?.[1] || 0
        return { rows: database.events.slice(offset, offset + limit).sort((a: any, b: any) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        )}
      }
      return { rows: database.events }
    }

    if (lowerText.includes('count') && lowerText.includes('from events')) {
      return { rows: [{ count: String(database.events.length) }] }
    }

    if (lowerText.includes('insert into events')) {
      const newEvent = {
        id: uuidv4(),
        title: values?.[0],
        description: values?.[1],
        date: values?.[2],
        time: values?.[3],
        location: values?.[4],
        category: values?.[5],
        image_url: values?.[6] || 'https://via.placeholder.com/600x400',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      database.events.push(newEvent)
      return { rows: [newEvent] }
    }

    if (lowerText.includes('update events') && lowerText.includes('where id')) {
      const id = values?.[values.length - 1]
      const index = database.events.findIndex(e => e.id === id)
      if (index > -1) {
        database.events[index] = {
          ...database.events[index],
          title: values?.[0] || database.events[index].title,
          description: values?.[1] || database.events[index].description,
          date: values?.[2] || database.events[index].date,
          time: values?.[3] || database.events[index].time,
          location: values?.[4] || database.events[index].location,
          category: values?.[5] || database.events[index].category,
          updated_at: new Date().toISOString(),
        }
        return { rows: [database.events[index]] }
      }
    }

    if (lowerText.includes('delete from events')) {
      const id = values?.[0]
      const index = database.events.findIndex(e => e.id === id)
      if (index > -1) {
        const deleted = database.events.splice(index, 1)
        return { rows: deleted }
      }
    }

    // PAGES
    if (lowerText.includes('select') && lowerText.includes('from pages')) {
      if (lowerText.includes('where slug')) {
        const slug = values?.[0]
        return { rows: database.pages.filter(p => p.slug === slug) }
      }
      return { rows: database.pages }
    }

    // SITE SETTINGS
    if (lowerText.includes('select') && lowerText.includes('from site_settings')) {
      return { rows: database.site_settings.map(s => ({ key: s.key, value: s.value })) }
    }

    return { rows: [] }
  } catch (error) {
    console.error('Mock DB Query Error:', error)
    return { rows: [] }
  }
}

export async function getClient() {
  return { query }
}
