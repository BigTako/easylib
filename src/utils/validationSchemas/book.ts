import { z } from 'zod'
import { errorMessage } from '../errorMessages'

const { STRLEN_MIN, STRLEN_MAX, INVALID_FIELD_TYPE, FIELD_REQUIRED } = errorMessage

export const createBookSchema = z.object({
  title: z
    .string({
      invalid_type_error: INVALID_FIELD_TYPE('Title', 'string'),
      required_error: FIELD_REQUIRED('Title')
    })
    .min(1, {
      message: STRLEN_MIN('Title', 1)
    })
    .max(128, {
      message: STRLEN_MAX('Title', 128)
    }),
  author: z
    .string({
      invalid_type_error: INVALID_FIELD_TYPE('Author`s name', 'string'),
      required_error: FIELD_REQUIRED('Author`s name')
    })
    .min(1, {
      message: STRLEN_MIN('Author`s name', 1)
    })
    .max(64, {
      message: STRLEN_MAX('Author`s name', 64)
    }),
  description: z
    .string()
    .min(1, {
      message: STRLEN_MIN('Description', 1)
    })
    .max(1024, {
      message: STRLEN_MAX('Description', 1024)
    })
    .nullish()
})

export const updateBookSchema = createBookSchema.partial()
