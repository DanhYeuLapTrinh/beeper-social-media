import { omit } from 'lodash'
import { HTTP_STATUS_CODES } from '@/constants'
import { NextFunction, Request, Response } from 'express'
import { InsufficientScopeError, InvalidTokenError, UnauthorizedError } from 'express-oauth2-jwt-bearer'

export const defaultErrorHanler = (err: any, req: Request, res: Response, next: NextFunction) => {
  switch (true) {
    case err instanceof InsufficientScopeError:
      res.status(err.status).json({ message: 'Permission denied' })
      break
    case err instanceof InvalidTokenError:
      res.status(err.status).json({ message: 'Bad credentials' })
      break
    case err instanceof UnauthorizedError:
      res.status(err.status).json({ message: 'Requires authentication' })
      break
    default:
      res.status(err.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(omit(err, ['status']))
  }
}
