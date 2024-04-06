import { createBook, getBooks } from '../controllers/books.controller'

import express from 'express'
// const express = require('express')

const router = express.Router()

router.get('/', getBooks).post('/', createBook)

export { router as booksRoutes }
