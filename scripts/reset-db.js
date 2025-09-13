const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function resetDatabase() {
  try {
    console.log('🗑️  Clearing existing data...')
    
    // Delete all messages first (due to foreign key constraints)
    await prisma.message.deleteMany()
    console.log('✅ Messages cleared')
    
    // Delete all users
    await prisma.user.deleteMany()
    console.log('✅ Users cleared')
    
    console.log('🎉 Database reset complete!')
    console.log('📝 Next steps:')
    console.log('1. Set up your Neon database connection in .env')
    console.log('2. Run: npx prisma db push')
    console.log('3. Run: npm run dev')
    
  } catch (error) {
    console.error('❌ Error resetting database:', error)
  } finally {
    await prisma.$disconnect()
  }
}

resetDatabase()
