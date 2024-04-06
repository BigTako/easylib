import express from 'express'
import { getToken } from '../controllers/auth.controller'
const router = express.Router()

router.get('/token', getToken)

export { router as authRoutes }
