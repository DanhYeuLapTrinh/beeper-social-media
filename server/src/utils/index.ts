import { FieldsType } from '@/middlewares/common.middleware'
import { ResponseOptions } from '@/models/api/common'
import { Response } from 'express'
import { pick } from 'lodash'

export const sendResponse = (res: Response, options: ResponseOptions): void => {
  const { message, status, data } = options
  let responseObj: ResponseOptions = { message }

  if (data !== undefined) {
    responseObj = { ...responseObj, data }
  }

  res.status(status || 200).json(responseObj)
}

export const pickData = <T>(data: T, fields: FieldsType<T>): Partial<T> => {
  return pick(data, fields)
}
