// const request = require('supertest')
// const { app } = require('../src/app')
// process.env.NODE_ENV = 'test'

// import request from 'supertest'

// import { app } from '../src/app'
// import { PrismaClient } from '@prisma/client/extension'
// import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended'

// import { prisma } from '../src/utils/db'

// jest.mock('../src/utils/db', () => ({
//   __esModule: true,
//   default: mockDeep<PrismaClient>()
// }))

// beforeEach(() => {
//   mockReset(prismaMock)
// })

// describe('Books routes', () => {
//   const testBook = {
//     title: 'Test Book',
//     author: 'Test Author',
//     description: 'Test Description'
//   }

//   test('gets all books', async () => {
//     const res = await request(app).get('/api/books')
//     console.log({ res: res.body })
//     expect(res.status).toBe(200)
//     expect(res.body).toEqual([])
//   })

//   test('creates a book', async () => {
//     const res = await request(app).post('/api/books').send(testBook)
//     expect(res.status).toBe(201)
//     expect(res.body).toMatchObject(testBook)
//   })
// })
