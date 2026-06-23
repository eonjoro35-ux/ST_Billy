import dotenv from 'dotenv'

dotenv.config()

let useMockDB = process.env.USE_MOCK_DB === 'true'
let pool: any

if (!useMockDB) {
  try {
    const { Pool } = await import('pg')
    pool = new Pool({
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      database: process.env.DB_NAME || 'school_website',
    })
    console.log('✅ Connected to PostgreSQL database')
  } catch (err) {
    console.log('⚠️  PostgreSQL not available, using in-memory mock database')
    useMockDB = true
  }
}

// Use mock database if PostgreSQL is unavailable
const mockDb = useMockDB ? await import('./mock-db') : null

export const query = (text: string, params?: any[]) => {
  if (useMockDB && mockDb) {
    return mockDb.query(text, params)
  }
  return pool.query(text, params)
}

export const getClient = async () => {
  if (useMockDB && mockDb) {
    return mockDb.getClient()
  }
  return pool.connect()
}

export default pool
