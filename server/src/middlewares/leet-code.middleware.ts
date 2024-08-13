import { validate } from '@/utils/validator'
import { checkSchema } from 'express-validator'

// Middleware validate slug
export const slugMiddleware = validate(
  checkSchema(
    {
      slug: {
        trim: true,
        custom: {
          options: async (value) => {
            if (!value) {
              throw new Error('Slug is required')
            }
            return true
          }
        }
      }
    },
    ['params']
  )
)
