import { ResponseOptions } from '@/models/api/res.api'
import { Response } from 'express'

export function sendResponse(res: Response, options: ResponseOptions): void {
  const { message, status, data } = options
  const responseObj: ResponseOptions = { message }

  if (data !== undefined) {
    responseObj.data = data
  }

  res.status(status || 200).json(responseObj)
}
