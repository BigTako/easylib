import { Request, Response, NextFunction } from 'express'
import { AppError } from '../utils/appError'

export const errorController = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  const { message, statusCode } = err
  console.error(err.stack)
  res.status(500).json({
    statusCode,
    message
  })
  next()
}
