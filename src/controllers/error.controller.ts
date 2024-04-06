import { Request, Response, NextFunction } from 'express'
import { AppError } from '../utils/appError'

export const errorController = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  const { messages, statusCode } = err
  console.log({ err })
  res.status(500).json({
    statusCode,
    messages
  })
  next()
}
