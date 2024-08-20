import { FieldsType } from '@/middlewares/common.middleware'
import { ResponseOptions } from '@/models/api/common'
import { Response } from 'express'
import { pick } from 'lodash'
import { RedisClientType } from 'redis'

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

export const saveDataToCache = async (
  client: RedisClientType,
  prefix: string,
  suffix: string,
  fieldName: string,
  data: any,
  expireTime: number = 3600
) => {
  await client.hSet(`${prefix}:${suffix}`, fieldName, JSON.stringify(data))
  await client.expire(`${prefix}:${suffix}`, expireTime)
}
