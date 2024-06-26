import express, { Express } from 'express'
import dotenv from 'dotenv'
import { booksRoutes } from './routes/books.routes'
import { AppError } from './utils/appError'
import { errorController } from './controllers/error.controller'
import { authRoutes } from './routes/auth.routes'
import { errorMessage } from './utils/errorMessages'
dotenv.config()

const app: Express = express()

app.use(express.json())

app.use('/api/books', booksRoutes)
app.use('/api/auth', authRoutes)

app.all('*', (req, res, next) => {
  next(new AppError([errorMessage.UNKNOWN_URL(req.originalUrl)], 404))
})

app.use(errorController)

export { app }
