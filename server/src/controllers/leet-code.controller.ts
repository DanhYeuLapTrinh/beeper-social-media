import redisService from '@/services/redis.services'
import leetCodeService from '@/services/leet-code.services'
import { CACHE_KEYS, ERROR_MESSAGES } from '@/constants'
import { pickData, saveDataToCache, sendResponse } from '@/utils'
import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { TitleSlugParamsAPI } from '@/models/api/leet-code/requests'
import { Filter } from '@/models/base.model'
import { DBQuestion } from '@/models/question.model'

const client = redisService.getRedisClient()

// Get questions controller
export const getQuestionsController = async (req: Request<ParamsDictionary, any, Filter>, res: Response) => {
  const data = await leetCodeService.getQuestions(req.body)
  sendResponse(res, { message: ERROR_MESSAGES.QUESTIONS.GET_QUESTIONS_SUCCESS, data })
}

// Get question header controller
export const getQuestionHeaderController = async (req: Request<TitleSlugParamsAPI>, res: Response) => {
  const question = req.question as DBQuestion
  const data = pickData(question, [
    'difficulty',
    'likes',
    'dislikes',
    'isPaidOnly',
    'frontendQuestionId',
    '_id',
    'title',
    'titleSlug'
  ])
  await saveDataToCache(client, CACHE_KEYS.QUESTION.PREFIX, question.titleSlug, CACHE_KEYS.QUESTION.HEADER, data)
  sendResponse(res, {
    message: ERROR_MESSAGES.QUESTIONS.GET_QUESTION_SUCCESS,
    data
  })
}

// Get question content controller
export const getQuestionContentController = async (req: Request<TitleSlugParamsAPI>, res: Response) => {
  const question = req.question as DBQuestion
  const data = pickData(question, ['content'])
  await saveDataToCache(client, CACHE_KEYS.QUESTION.PREFIX, question.titleSlug, CACHE_KEYS.QUESTION.CONTENT, data)
  sendResponse(res, {
    message: ERROR_MESSAGES.QUESTIONS.GET_QUESTION_SUCCESS,
    data
  })
}

// Get question topics controller
export const getQuestionTopicsController = async (req: Request<TitleSlugParamsAPI>, res: Response) => {
  const question = req.question as DBQuestion
  const topicTags = await leetCodeService.getTopicTags(question.topicTags)
  await saveDataToCache(client, CACHE_KEYS.QUESTION.PREFIX, question.titleSlug, CACHE_KEYS.QUESTION.TOPIC, topicTags)
  sendResponse(res, {
    message: ERROR_MESSAGES.QUESTIONS.GET_QUESTION_SUCCESS,
    data: topicTags
  })
}

// Get question hints controller
export const getQuestionHintsController = async (req: Request<TitleSlugParamsAPI>, res: Response) => {
  const question = req.question as DBQuestion
  const data = pickData(question, ['hints'])
  await saveDataToCache(client, CACHE_KEYS.QUESTION.PREFIX, question.titleSlug, CACHE_KEYS.QUESTION.HINTS, data)
  sendResponse(res, {
    message: ERROR_MESSAGES.QUESTIONS.GET_QUESTION_SUCCESS,
    data
  })
}

// Get question example test cases controller
export const getQuestionTestcaseController = async (req: Request<TitleSlugParamsAPI>, res: Response) => {
  const question = req.question as DBQuestion
  const data = pickData(question, ['exampleTestcaseList'])
  await saveDataToCache(client, CACHE_KEYS.QUESTION.PREFIX, question.titleSlug, CACHE_KEYS.QUESTION.TEST_CASE, data)
  sendResponse(res, {
    message: ERROR_MESSAGES.QUESTIONS.GET_QUESTION_SUCCESS,
    data
  })
}

// TODO: Get question similar controller
