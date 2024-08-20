import leetCodeService from '@/services/leet-code.services'
import redisService from '@/services/redis.services'
import { TitleSlugParamsAPI } from '@/models/api/leet-code/requests'
import { NextFunction, Request, Response } from 'express'
import { pick } from 'lodash'
import { sendResponse } from '@/utils'
import { ERROR_MESSAGES } from '@/constants'

export type FieldsType<T> = Array<keyof T>

const client = redisService.getRedisClient()

// Middleware to pick only the specified fields from the request body
export const pickDataMiddleware =
  <T>(fields: FieldsType<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    req.body = pick(req.body, fields)
    next()
  }

// Middleware to check if the question exists in the database, if not then fetch it from the LeetCode API and save to DB
export const getQuestionInDBMiddleware = async (
  req: Request<TitleSlugParamsAPI>,
  res: Response,
  next: NextFunction
) => {
  try {
    const question = await leetCodeService.checkQuestionInDB(req.params.titleSlug)
    req.question = question
  } catch (error) {
    next(error)
  }
  next()
}

export const getCachedDataMiddleware =
  (prefix?: string, fieldName?: string) =>
  async (req: Request<TitleSlugParamsAPI>, res: Response, next: NextFunction) => {
    if (prefix && fieldName) {
      const { titleSlug } = req.params
      const cachedData = await client.hGet(`${prefix}:${titleSlug}`, fieldName)
      if (cachedData) {
        return sendResponse(res, {
          message: ERROR_MESSAGES.QUESTIONS.GET_QUESTION_SUCCESS,
          data: JSON.parse(cachedData)
        })
      }
    }
    next()
  }
