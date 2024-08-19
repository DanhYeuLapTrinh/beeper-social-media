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

export class EntityError extends BaseError {
  errors: ErrorsType
  constructor({ message = ERROR_MESSAGES.AUTH.VALIDATION_FAILED, errors }: { message?: string; errors: ErrorsType }) {
    super({ message, status: HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY })
    this.errors = errors
  }
}

export class ResponseOptions {
  message: string
  status?: number
  data?: any
  constructor({ message, status, data }: { message: string; status?: number; data?: any }) {
    this.message = message
    this.status = status
    this.data = data
  }
}
