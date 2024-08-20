import { ERROR_MESSAGES, HTTP_STATUS_CODES } from '@/constants'
import { NextFunction, Request, Response } from 'express'
import { ValidationChain, validationResult } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/lib/middlewares/schema'
import { sendResponse } from '.'
import { BaseError, EntityError } from '@/models/api/error'

export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await validation.run(req)
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      // Nếu không có lỗi thì đi đến các request handler tiếp theo
      return next()
    }
    // các lỗi khác 422
    const errorsObj = errors.mapped()
    // entity error (422)
    const entityError = new EntityError({ errors: {} })
    for (const key in errorsObj) {
      const { msg } = errorsObj[key]
      // Check xem nếu error là có khác 422 hay không
      if (msg instanceof BaseError && msg.status !== HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY) {
        // NOTE: nếu next được truyền thêm params thì sẽ được xem như là 1 lỗi và express sẽ skip các request handler khác và tới thẳng error handler (đang ở index.ts)
        return next(msg)
      }
      entityError.errors[key] = errorsObj[key]
    }
    next(entityError)
  }
}

export const checkForEmptyBody = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return sendResponse(res, { message: ERROR_MESSAGES.GENERAL.EMPTY_BODY, status: HTTP_STATUS_CODES.BAD_REQUEST })
  }
  next()
}
