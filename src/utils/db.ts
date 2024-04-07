import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

dotenv.config()

if (process.env.NODE_ENV === 'test') {
  process.env.DATABASE_URL = process.env.TEST_DATABASE_URL
}

export const prisma = new PrismaClient()
