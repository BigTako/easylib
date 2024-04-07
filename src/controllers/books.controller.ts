import { NextFunction, Request, Response } from 'express'
import { catchAsync } from '../utils/catchAsync'
import { prisma } from '../utils/db'
import { AppError } from '../utils/appError'
import { Prisma } from '@prisma/client'
import { errorMessage } from '../utils/errorMessages'

export const getBooks = catchAsync(async (req: Request, res: Response) => {
  const docs = await prisma.book.findMany()
  res.status(200).json(docs)
})

export const createBook = catchAsync(async (req: Request, res: Response) => {
  const { title, author, description } = req.body
  const doc = await prisma.book.create({
    data: {
      title,
      author,
      description
    }
  })
  res.status(201).json(doc)
})

export const updateBook = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const { title, author } = req.body

  try {
    const doc = await prisma.book.update({
      where: { id },
      data: {
        title,
        author
      }
    })
    res.status(201).json(doc)
  } catch (error) {
    console.log(error)
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return next(new AppError([errorMessage.DOC_NOT_FOUND], 404))
    }
    throw error
  }
})

export const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  await prisma.book.delete({
    where: { id }
  })
  res.status(204).json(null)
})
