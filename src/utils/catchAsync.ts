import { Request, Response, NextFunction } from 'express'

type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<unknown>

export function catchAsync(fn: AsyncFunction) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next)
  }
}
