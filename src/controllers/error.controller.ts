import { Request, Response, NextFunction } from 'express'
import { AppError } from '../utils/appError'

export const errorController = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  const { messages, statusCode } = err
  res.status(statusCode).json({
    statusCode,
    messages
  })
  next()
}
