import leetCodeServices from '@/services/leet-code.services'
import redisServices from '@/services/redis.services'
import dbServices from '@/services/db.services'
import { TitleSlugParamsAPI } from '@/models/api/leet-code/requests'
import { NextFunction, Request, Response } from 'express'
import { omit, pick } from 'lodash'
import { sendResponse } from '@/utils'
import { CACHE_KEYS, ERROR_MESSAGES } from '@/constants'
import { NotFoundError } from '@/models/api/error'
import { DBQuestion } from '@/models/question.model'

export type FieldsType<T> = Array<keyof T>

const client = redisServices.getRedisClient()

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
    const { titleSlug } = req.params
    const questionInDB = await dbServices.questions.findOne({ titleSlug })
    if (!questionInDB) {
      const { data: questionData } = await leetCodeServices.getQuestion({ titleSlug })
      const { data: questionTopicTags } = await leetCodeServices.getQuestionTopicTags({ titleSlug })
      if (!questionData.question || !questionTopicTags.question.topicTags) {
        throw new NotFoundError()
      }
      const question = new DBQuestion({
        ...questionData.question,
        topicTags: questionTopicTags.question.topicTags.map((tag) => tag.slug)
      })
      await dbServices.questions.updateOne(
        { titleSlug: question.titleSlug },
        {
          $set: omit(
            {
              ...question,
              isPaidOnly: Math.random() < 0.7 ? false : true
            },
            ['_id']
          )
        },
        { upsert: true }
      )
      // Check if topic tags exist in the database then update them otherwise insert them
      for (const tag of questionTopicTags.question.topicTags) {
        await client.del(`${CACHE_KEYS.QUESTION.SIMILAR_QUESTIONS}:${tag.slug}`)
        await dbServices.topicTags.updateOne({ slug: tag.slug }, { $set: tag }, { upsert: true })
      }
      req.question = question
    } else {
      req.question = questionInDB as DBQuestion
    }
  } catch (error) {
    next(error)
  }
  next()
}

export const getCachedDataMiddleware =
  ({
    prefix,
    suffix,
    fieldName,
    dataType = 'hash'
  }: {
    prefix?: string
    suffix?: string
    fieldName?: string
    dataType?: 'hash' | 'string' | 'json' | 'number'
  }) =>
  async (req: Request<TitleSlugParamsAPI>, res: Response, next: NextFunction) => {
    if (prefix && fieldName) {
      const { titleSlug } = req.params
      const key = suffix ? `${prefix}:${suffix}` : `${prefix}:${titleSlug}`
      let cachedData: any
      switch (dataType) {
        case 'hash':
          cachedData = await client.hGet(key, fieldName)
          break
        case 'json':
          cachedData = await client.json.get(key)
          break
        default:
          throw new Error('Unsupported data type')
      }
      if (cachedData) {
        return sendResponse(res, {
          message: ERROR_MESSAGES.QUESTIONS.GET_QUESTION_SUCCESS,
          data: JSON.parse(cachedData)
        })
      }
    }
    next()
  }
