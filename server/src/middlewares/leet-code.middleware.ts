import { ERROR_MESSAGES, LEET_CODE_FILTER_KEYS } from '@/constants'
import { filtersSchema } from '@/schemas'
import { validate } from '@/utils/validator'
import { checkSchema } from 'express-validator'

export const getProblemsMiddleware = validate(
  checkSchema(
    {
      categorySlug: {
        optional: true,
        isString: {
          errorMessage: ERROR_MESSAGES.FILTERS.INVALID_TYPE_CATEGORY_SLUG
        },
        trim: true,
        notEmpty: true
      },
      filters: {
        optional: true,
        isObject: true,
        custom: {
          options: (value) => {
            const keys = Object.keys(value)

            if (keys.length === 0) {
              return true
            }

            const isValid = keys.every((key) => LEET_CODE_FILTER_KEYS.includes(key))
            if (!isValid) {
              throw new Error(ERROR_MESSAGES.FILTERS.INVALID_FILTER_KEYS)
            }
            return true
          }
        }
      },
      limit: {
        isNumeric: {
          errorMessage: ERROR_MESSAGES.FILTERS.INVALID_TYPE_LIMIT
        }
      },
      skip: {
        isNumeric: {
          errorMessage: ERROR_MESSAGES.FILTERS.INVALID_TYPE_SKIP
        }
      }
    },
    ['body']
  )
)
