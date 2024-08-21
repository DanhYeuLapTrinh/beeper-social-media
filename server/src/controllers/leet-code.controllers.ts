import leetCodeServices from '@/services/leet-code.services'
import questionServices from '@/services/question.services'
import redisServices from '@/services/redis.services'
import { CACHE_KEYS, ERROR_MESSAGES } from '@/constants'
import { TitleSlugParamsAPI } from '@/models/api/leet-code/requests'
import { Filter } from '@/models/base.model'
import { DBQuestion } from '@/models/question.model'
import { pickData, saveDataToCache, sendResponse } from '@/utils'
import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'

const client = redisServices.getRedisClient()

// Get questions controller
export const getQuestionsController = async (req: Request<ParamsDictionary, any, Filter>, res: Response) => {
  const data = await leetCodeServices.getQuestions(req.body)
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
  await saveDataToCache({
    client,
    prefix: CACHE_KEYS.QUESTION.PREFIX,
    suffix: question.titleSlug,
    fieldName: CACHE_KEYS.QUESTION.HEADER,
    data,
    expireTime: 60 * 60 * 24 * 7
  })
  sendResponse(res, {
    message: ERROR_MESSAGES.QUESTIONS.GET_QUESTION_SUCCESS,
    data
  })
}

// Get question content controller
export const getQuestionContentController = async (req: Request<TitleSlugParamsAPI>, res: Response) => {
  const question = req.question as DBQuestion
  const data = pickData(question, ['content'])
  await saveDataToCache({
    client,
    prefix: CACHE_KEYS.QUESTION.PREFIX,
    suffix: question.titleSlug,
    fieldName: CACHE_KEYS.QUESTION.CONTENT,
    data,
    expireTime: 60 * 60 * 24 * 7
  })
  sendResponse(res, {
    message: ERROR_MESSAGES.QUESTIONS.GET_QUESTION_SUCCESS,
    data
  })
}

// Get question topics controller
export const getQuestionTopicsController = async (req: Request<TitleSlugParamsAPI>, res: Response) => {
  const question = req.question as DBQuestion
  const topicTags = await questionServices.getTopicTags(question.topicTags)
  await saveDataToCache({
    client,
    prefix: CACHE_KEYS.QUESTION.PREFIX,
    suffix: question.titleSlug,
    fieldName: CACHE_KEYS.QUESTION.TOPIC,
    data: topicTags,
    expireTime: 60 * 60 * 24 * 7
  })
  sendResponse(res, {
    message: ERROR_MESSAGES.QUESTIONS.GET_QUESTION_SUCCESS,
    data: topicTags
  })
}

// Get question hints controller
export const getQuestionHintsController = async (req: Request<TitleSlugParamsAPI>, res: Response) => {
  const question = req.question as DBQuestion
  const data = pickData(question, ['hints'])
  await saveDataToCache({
    client,
    prefix: CACHE_KEYS.QUESTION.PREFIX,
    suffix: question.titleSlug,
    fieldName: CACHE_KEYS.QUESTION.HINTS,
    data,
    expireTime: 60 * 60 * 24 * 7
  })
  sendResponse(res, {
    message: ERROR_MESSAGES.QUESTIONS.GET_QUESTION_SUCCESS,
    data
  })
}

// Get question example test cases controller
export const getQuestionTestcaseController = async (req: Request<TitleSlugParamsAPI>, res: Response) => {
  const question = req.question as DBQuestion
  const data = pickData(question, ['exampleTestcaseList'])
  await saveDataToCache({
    client,
    prefix: CACHE_KEYS.QUESTION.PREFIX,
    suffix: question.titleSlug,
    fieldName: CACHE_KEYS.QUESTION.TEST_CASE,
    data,
    expireTime: 60 * 60 * 24 * 7
  })
  sendResponse(res, {
    message: ERROR_MESSAGES.QUESTIONS.GET_QUESTION_SUCCESS,
    data
  })
}

// Get similar questions controller
export const getSimilarQuestionsController = async (req: Request<TitleSlugParamsAPI>, res: Response) => {
  const question = req.question as DBQuestion
  // 0. Check in cache if similar questions exist
  const similarQuestionsCache = [] as DBQuestion[]
  const promises = question.topicTags.map(async (tag) => {
    const cachedData = await client.json.get(`${CACHE_KEYS.QUESTION.SIMILAR_QUESTIONS}:${tag}`)
    const parsedData = JSON.parse(String(cachedData))
    if (parsedData && parsedData.similarQuestions && parsedData.similarQuestions.length > 0) {
      similarQuestionsCache.push(...parsedData.similarQuestions)
    }
  })
  await Promise.all(promises)
  // Remove duplicates
  // NOTE: u can create a MAP by putting 2-dimensional array as an argument
  // EG: [[key1, value1], [key2, value2], [key3, value3]]
  const similarQuestions = Array.from(new Map(similarQuestionsCache.map((post) => [post.titleSlug, post])).values())

  if (similarQuestions.length > 0) {
    sendResponse(res, {
      message: ERROR_MESSAGES.QUESTIONS.GET_QUESTION_SUCCESS,
      data: { similarQuestions: similarQuestions.filter((q) => q.titleSlug !== question.titleSlug) }
    })
  } else {
    // 1. Get topicTags and query in DB for similar questions
    const { similarQuestions } = await questionServices.getSimilarQuestions(question.topicTags)
    // 2. Send response back to the user
    sendResponse(res, {
      message: ERROR_MESSAGES.QUESTIONS.GET_QUESTION_SUCCESS,
      data: { similarQuestions: similarQuestions.filter((q) => q.titleSlug !== question.titleSlug) }
    })
    // 3. Loop through the topicTags to find posts with the tag then save to cache
    question.topicTags.forEach(async (tag) => {
      const questionsWithTag = await questionServices.getSimilarQuestions([tag])
      await saveDataToCache({
        client,
        prefix: CACHE_KEYS.QUESTION.SIMILAR_QUESTIONS,
        suffix: tag,
        fieldName: '.',
        data: questionsWithTag,
        expireTime: 60 * 60,
        dataType: 'json'
      })
    })
  }
}
