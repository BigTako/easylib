import { createBook, deleteBook, getBooks, updateBook } from '../controllers/books.controller'

import express from 'express'
// const express = require('express')

const router = express.Router()

router.get('/', getBooks).post('/', createBook).put('/:id', updateBook).delete('/:id', deleteBook)

export { router as booksRoutes }
