import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import prisma from './config/database'

dotenv.config()

const app = express()
const port = process.env.PORT || 3001

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',  // Local development
    'https://toolnest-three.vercel.app/'  // Your deployed frontend URL
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to ToolNest API' })
})

// Database connection test
prisma.$connect()
  .then(() => console.log('✅ Connected to database'))
  .catch((e) => console.error('❌ Database connection error:', e))

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`)
})