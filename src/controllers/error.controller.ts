import { Request, Response, NextFunction } from 'express'

export const errorController = (
  err: { stack: string; message: string },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack)
  res.status(500).json({
    status: 'error',
    message: err.message
  })
  next()
}
