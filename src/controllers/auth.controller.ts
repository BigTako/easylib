import { NextFunction, Request, Response } from 'express'
import { catchAsync } from '../utils/catchAsync'
import jwtLib from 'jsonwebtoken'
import { AppError } from '../utils/appError'

const userId = 'user id'

const signToken = (id: string) => {
  return jwtLib.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: Number(process.env.JWT_EXPIRES_IN)
  })
}

export const getToken = catchAsync(async (req: Request, res: Response) => {
  const jwt = signToken(userId)
  res.status(200).json({ jwt })
})

export const protect = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  let token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return next(new AppError(['You are not logged in'], 401))
  }

  try {
    const decoded = await Promise.resolve(jwtLib.verify(token, process.env.JWT_SECRET as string) as { id: string })

    const isCorrectUser = decoded && decoded.id === userId

    if (isCorrectUser) {
      return next()
    }

    return next(new AppError(['Invalid token'], 401))
  } catch (err) {
    return next(new AppError(['Token is invalid or has expired'], 401))
  }
})
