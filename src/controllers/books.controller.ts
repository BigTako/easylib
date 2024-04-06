import { Request, Response } from 'express'
import { catchAsync } from '../utils/catchAsync'
import { prisma } from '../utils/db'

export const getBooks = catchAsync(async (req: Request, res: Response) => {
  const docs = await prisma.book.findMany()
  res.status(200).json(docs)
})

export const createBook = catchAsync(async (req: Request, res: Response) => {
  console.log({ body: req.body })
  const { title, author } = req.body
  const doc = await prisma.book.create({
    data: {
      title,
      author
    }
  })
  res.status(201).json(doc)
})

export const updateBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const { title, author } = req.body
  const doc = await prisma.book.update({
    where: { id },
    data: {
      title,
      author
    }
  })
  res.status(200).json(doc)
})

export const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  await prisma.book.delete({
    where: { id }
  })
  res.status(204).json(null)
})
