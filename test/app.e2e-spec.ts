// const request = require('supertest')
// const { app } = require('../src/app')
process.env.NODE_ENV = 'test'

import request from 'supertest'
import { app } from '../src/app'

import { prisma } from '../src/utils/db'

beforeAll(async () => {
  await prisma.$connect()
  await prisma.book.deleteMany()
})

afterAll(async () => {
  await prisma.$disconnect()
})

describe('Books routes', () => {
  let jwt: string

  const testBook = {
    title: 'Test Book',
    author: 'Test Author',
    description: 'Test Description'
  }

  test('gets jwt token', async () => {
    const res = await request(app).get('/api/auth/token')
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('jwt')
    jwt = res.body.jwt
  })

  test('throws BadRequest trying to access route with invalid token', async () => {
    const res = await request(app).post('/api/books').set('Authorization', `Bearer ${'1234'}`).send(testBook)
    expect(res.status).toBe(401)
    expect(res.body.messages).toContain('Token is invalid or has expired')
  })

  test('gets all books', async () => {
    const res = await request(app).get('/api/books')
    expect(res.status).toBe(200)
    expect(res.body).toEqual([])
  })

  test('creates a book', async () => {
    const res = await request(app).post('/api/books').set('Authorization', `Bearer ${jwt}`).send(testBook)
    expect(res.status).toBe(201)
    expect(res.body).toMatchObject(testBook)
  })

  test('throws Unauthorized error trying to create a book without JWT', async () => {
    const res = await request(app).post('/api/books').send(testBook)
    expect(res.status).toBe(401)
    expect(res.body.messages as string[]).toContain('You are not logged in')
  })

  test('creates a book with missing fields', async () => {
    const res = await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${jwt}`)
      .send({ ...testBook, description: undefined })

    expect(res.status).toBe(201)
    expect(res.body).toMatchObject({ ...testBook, description: null })
  })

  test('throws BadRequest trying to create a book without required fields', async () => {
    const res = await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${jwt}`)
      .send({ ...testBook, title: undefined, author: undefined })

    expect(res.status).toBe(400)
    expect(res.body.messages).toEqual(['Title is required', 'Author`s name is required'])
  })

  test('throws BadRequest trying to create a book with invalid body', async () => {
    const res = await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${jwt}`)
      .send({ ...testBook, title: '', author: '' })

    expect(res.status).toBe(400)
    expect(res.body.messages).toEqual([
      'Title must be at least 1 character long',
      'Author`s name must be at least 1 character long'
    ])
  })

  test('throws Unauthorized trying to update book without token', async () => {
    const { body: createdBook } = await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${jwt}`)
      .send(testBook)

    const { id } = createdBook

    const res = await request(app).put(`/api/books/${id}`).send({ title: 'New title' })

    expect(res.status).toBe(401)
    expect(res.body.messages).toContain('You are not logged in')
  })

  test('throws BadRequest trying to update book with invalid body', async () => {
    const { body: createdBook } = await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${jwt}`)
      .send(testBook)

    const { id } = createdBook

    const res = await request(app)
      .put(`/api/books/${id}`)
      .set('Authorization', `Bearer ${jwt}`)
      .send({ title: '', author: '' })

    expect(res.status).toBe(400)
    expect(res.body.messages).toEqual([
      'Title must be at least 1 character long',
      'Author`s name must be at least 1 character long'
    ])
  })

  test('updates book by id', async () => {
    const { body: createdBook } = await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${jwt}`)
      .send(testBook)

    const { id } = createdBook

    const res = await request(app)
      .put(`/api/books/${id}`)
      .set('Authorization', `Bearer ${jwt}`)
      .send({ title: 'NEW title', author: 'NEW author name' })

    expect(res.status).toBe(201)
    expect(res.body).toMatchObject({ ...createdBook, title: 'NEW title', author: 'NEW author name' })
  })

  test('throws Unauthorized trying to delete book without token', async () => {
    const { body: createdBook } = await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${jwt}`)
      .send(testBook)

    const { id } = createdBook

    const res = await request(app).delete(`/api/books/${id}`)

    expect(res.status).toBe(401)
    expect(res.body.messages).toContain('You are not logged in')
  })

  test('deletes book by id', async () => {
    const { body: createdBook } = await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${jwt}`)
      .send(testBook)

    const { id } = createdBook

    const res = await request(app).delete(`/api/books/${id}`).set('Authorization', `Bearer ${jwt}`)

    expect(res.status).toBe(204)
  })
})
