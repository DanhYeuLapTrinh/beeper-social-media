import { HTTP_STATUS_CODES } from '@/constants'
import { NextFunction, Request, Response } from 'express'
import { omit } from 'lodash'

export const defaultErrorHanler = (err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(omit(err, ['status']))
}
