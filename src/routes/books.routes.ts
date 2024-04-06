import { Response } from 'express'

import express from 'express'
// const express = require('express')

const router = express.Router()

router.get('/', (req, res: Response) => {
  res.status(200).json([
    {
      id: 2,
      title: 'The Great Gatsby'
    }
  ])
})

export { router as booksRoutes }
