import express from 'express'
import { createBookSchema, updateBookSchema } from '../utils/validationSchemas/book'
import { createBook, deleteBook, getBooks, updateBook } from '../controllers/books.controller'
import { protect } from '../controllers/auth.controller'
import { validate } from '../utils/validate'

const router = express.Router()

router
  .get('/', getBooks)
  .post('/', protect, validate(createBookSchema), createBook)
  .put('/:id', protect, validate(updateBookSchema), updateBook)
  .delete('/:id', protect, deleteBook)

export { router as booksRoutes }
