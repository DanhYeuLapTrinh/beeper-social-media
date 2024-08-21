import { ERROR_MESSAGES, HTTP_STATUS_CODES } from '@/constants'

type ErrorsType = Record<string, { msg: string; [key: string]: any }>

export class BaseError {
  message: string
  status: number
  constructor({ message, status }: { message: string; status: number }) {
    this.message = message
    this.status = status
  }
}

// Error when processing entity data (forms, etc.)
export class EntityError extends BaseError {
  errors: ErrorsType
  constructor({ message = ERROR_MESSAGES.AUTH.VALIDATION_FAILED, errors }: { message?: string; errors: ErrorsType }) {
    super({ message, status: HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY })
    this.errors = errors
  }
}

export class AuthError extends BaseError {
  constructor({ message = ERROR_MESSAGES.GENERAL.UNAUTHORIZED } = {}) {
    super({ message, status: HTTP_STATUS_CODES.UNAUTHORIZED })
  }
}

export class NotFoundError extends BaseError {
  constructor({ message = ERROR_MESSAGES.GENERAL.NOT_FOUND } = {}) {
    super({ message, status: HTTP_STATUS_CODES.NOT_FOUND })
  }
}

export class ForbiddenError extends BaseError {
  constructor({ message = ERROR_MESSAGES.GENERAL.FORBIDDEN } = {}) {
    super({ message, status: HTTP_STATUS_CODES.FORBIDDEN })
  }
}

export class BadRequestError extends BaseError {
  constructor({ message = ERROR_MESSAGES.GENERAL.BAD_REQUEST } = {}) {
    super({ message, status: HTTP_STATUS_CODES.BAD_REQUEST })
  }
}

export class RedisError extends BaseError {
  constructor({ message = ERROR_MESSAGES.GENERAL.REDIS_TIMEOUT } = {}) {
    super({ message, status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR })
  }
}

export class ConflictError extends BaseError {
  constructor({ message = ERROR_MESSAGES.GENERAL.CONFLICT } = {}) {
    super({ message, status: HTTP_STATUS_CODES.CONFLICT })
  }
}
