import { CACHE_KEYS, ROUTES } from '@/constants'
import {
  getQuestionContentController,
  getQuestionHeaderController,
  getQuestionHintsController,
  getQuestionsController,
  getQuestionTestcaseController,
  getQuestionTopicsController,
  getSimilarQuestionsController
} from '@/controllers/leet-code.controllers'
import { getCachedDataMiddleware, getQuestionInDBMiddleware } from '@/middlewares/common.middlewares'
import { getQuestionsMiddleware } from '@/middlewares/question.middlewares'
import { errorHandler } from '@/utils/handler'
import { config } from 'dotenv'
import { Router } from 'express'

config()

const leetCodeRoutes = Router()
// Get questions
leetCodeRoutes.post(ROUTES.LEET_CODE.ALL, getQuestionsMiddleware, errorHandler(getQuestionsController))

// Get question header
leetCodeRoutes.get(
  ROUTES.LEET_CODE.QUESTION,
  getCachedDataMiddleware({
    prefix: CACHE_KEYS.QUESTION.PREFIX,
    fieldName: CACHE_KEYS.QUESTION.HEADER
  }),
  getQuestionInDBMiddleware,
  errorHandler(getQuestionHeaderController)
)

// Get question content
leetCodeRoutes.get(
  ROUTES.LEET_CODE.CONTENT,
  getCachedDataMiddleware({
    prefix: CACHE_KEYS.QUESTION.PREFIX,
    fieldName: CACHE_KEYS.QUESTION.CONTENT
  }),
  getQuestionInDBMiddleware,
  errorHandler(getQuestionContentController)
)

// Get question topic
leetCodeRoutes.get(
  ROUTES.LEET_CODE.TOPIC,
  getCachedDataMiddleware({
    prefix: CACHE_KEYS.QUESTION.PREFIX,
    fieldName: CACHE_KEYS.QUESTION.TOPIC
  }),
  getQuestionInDBMiddleware,
  errorHandler(getQuestionTopicsController)
)

// Get question hints
leetCodeRoutes.get(
  ROUTES.LEET_CODE.HINTS,
  getCachedDataMiddleware({
    prefix: CACHE_KEYS.QUESTION.PREFIX,
    fieldName: CACHE_KEYS.QUESTION.HINTS
  }),
  getQuestionInDBMiddleware,
  errorHandler(getQuestionHintsController)
)

// Get question test case
leetCodeRoutes.get(
  ROUTES.LEET_CODE.TEST_CASE,
  getCachedDataMiddleware({
    prefix: CACHE_KEYS.QUESTION.PREFIX,
    fieldName: CACHE_KEYS.QUESTION.TEST_CASE
  }),
  getQuestionInDBMiddleware,
  errorHandler(getQuestionTestcaseController)
)

// Get question similar questions
leetCodeRoutes.get(
  ROUTES.LEET_CODE.SIMILAR_QUESTIONS,
  getQuestionInDBMiddleware,
  errorHandler(getSimilarQuestionsController)
)

export default leetCodeRoutes
