import { FieldsType } from '@/middlewares/common.middlewares'
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

export const saveDataToCache = async ({
  client,
  prefix,
  suffix,
  fieldName,
  data,
  expireTime = 3600,
  dataType = 'hash'
}: {
  client: RedisClientType
  prefix: string
  suffix: string
  fieldName: string
  data: any
  expireTime?: number
  dataType?: 'hash' | 'string' | 'json' | 'number'
}) => {
  const key = `${prefix}:${suffix}`

  switch (dataType) {
    case 'hash':
      await client.hSet(key, fieldName, JSON.stringify(data))
      break
    case 'json':
      await client.json.set(key, fieldName, JSON.stringify(data))
      break
    default:
      throw new Error('Unsupported data type')
  }

  await client.expire(key, expireTime)
}
