import { NextFunction, Request, Response } from 'express'
import { AppError } from './appError'
import { catchAsync } from './catchAsync'
import { ZodIssue, ZodSchema } from 'zod'

export const validate = (schema: ZodSchema) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const validationResult = schema.safeParse(req.body)

    if (!validationResult['success']) {
      const errors = validationResult['error'].issues.map((issue: ZodIssue) => issue.message)
      return next(new AppError(errors, 400))
    }
    next()
  })
