import express from 'express'
import { createBookSchema, updateBookSchema } from '../utils/validationSchemas/book'
import { createBook, deleteBook, getBooks, updateBook } from '../controllers/books.controller'
import { validate } from '../utils/validate'

const router = express.Router()

router
  .get('/', getBooks)
  .post('/', validate(createBookSchema), createBook)
  .put('/:id', validate(updateBookSchema), updateBook)
  .delete('/:id', deleteBook)

export { router as booksRoutes }
