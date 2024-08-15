import { Schema } from 'express-validator'

export const filtersSchema: Schema = {
  difficulty: {
    optional: true,
    isString: true,
    notEmpty: {
      errorMessage: 'Difficulty must be a non-empty string'
    }
  },
  listId: {
    optional: true,
    isString: true,
    notEmpty: {
      errorMessage: 'ListId must be a non-empty string'
    }
  },
  status: {
    optional: true,
    isString: true,
    notEmpty: {
      errorMessage: 'Status must be a non-empty string'
    }
  },
  tags: {
    optional: true,
    isArray: {
      options: { min: 1 },
      errorMessage: 'Tags must be a non-empty array of strings'
    },
    custom: {
      options: (value: any) => {
        return value.every((tag: string) => typeof tag === 'string' && tag.trim() !== '')
      },
      errorMessage: 'Each tag must be a non-empty string'
    }
  }
}
