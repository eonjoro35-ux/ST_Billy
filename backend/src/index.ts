import { initializeDatabase, seedDatabase } from './db/migrations'

const main = async () => {
  try {
    await initializeDatabase()
    await seedDatabase()
    console.log('✅ Database setup complete!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Database setup failed:', error)
    process.exit(1)
  }
}

main()
