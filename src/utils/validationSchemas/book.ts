import { z } from 'zod'

export const createBookSchema = z.object({
  title: z
    .string({
      invalid_type_error: 'Title must be a string',
      required_error: 'Title is required'
    })
    .min(1, {
      message: 'Title must be at least 1 character long'
    })
    .max(128, {
      message: 'Title must be at most 128 characters long'
    }),
  author: z
    .string({
      invalid_type_error: 'Author`s name must be a string',
      required_error: 'Author`s name is required'
    })
    .min(1, {
      message: 'Author`s name must be at least 1 character long'
    })
    .max(64, {
      message: 'Author`s name must be at most 64 characters long'
    }),
  description: z
    .string()
    .min(1, {
      message: 'Description must be at least 1 character long'
    })
    .max(1024, {
      message: 'Description name must be at most 1024 characters long'
    })
    .nullish()
})

export const updateBookSchema = createBookSchema.partial()
