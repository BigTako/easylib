import { Request, Response } from 'express'
import { catchAsync } from '../utils/catchAsync'
import { prisma } from '../utils/db'

export const getBooks = catchAsync(async (req: Request, res: Response) => {
  const docs = prisma.book.findMany()
  res.status(200).json(docs)
})

export const createBook = catchAsync(async (req: Request, res: Response) => {
  const { title, author } = req.body
  const doc = prisma.book.create({
    data: {
      title,
      author
    }
  })
  res.status(201).json(doc)
})
