import { ResponseOptions } from '@/models/api/res.api'
import { Response } from 'express'

export function sendResponse(res: Response, options: ResponseOptions): void {
  const { message, status, data } = options
  let responseObj: ResponseOptions = { message }

  if (data !== undefined) {
    responseObj = { ...responseObj, ...data }
  }

  res.status(status || 200).json(responseObj)
}
