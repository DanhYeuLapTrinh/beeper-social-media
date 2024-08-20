import { CACHE_KEYS, ROUTES } from '@/constants'
import {
  getQuestionContentController,
  getQuestionHeaderController,
  getQuestionHintsController,
  getQuestionsController,
  getQuestionTestcaseController,
  getQuestionTopicsController
} from '@/controllers/leet-code.controller'
import { getCachedDataMiddleware, getQuestionInDBMiddleware } from '@/middlewares/common.middleware'
import { getQuestionsMiddleware } from '@/middlewares/question.middleware'
import { errorHandler } from '@/utils/handler'
import { config } from 'dotenv'
import { Router } from 'express'

config()

const leetCodeRoutes = Router()

leetCodeRoutes.post(ROUTES.LEET_CODE.ALL, getQuestionsMiddleware, errorHandler(getQuestionsController))
leetCodeRoutes.get(
  ROUTES.LEET_CODE.QUESTION,
  getCachedDataMiddleware(CACHE_KEYS.QUESTION.PREFIX, CACHE_KEYS.QUESTION.HEADER),
  getQuestionInDBMiddleware,
  errorHandler(getQuestionHeaderController)
)
leetCodeRoutes.get(
  ROUTES.LEET_CODE.CONTENT,
  getCachedDataMiddleware(CACHE_KEYS.QUESTION.PREFIX, CACHE_KEYS.QUESTION.CONTENT),
  getQuestionInDBMiddleware,
  errorHandler(getQuestionContentController)
)
leetCodeRoutes.get(
  ROUTES.LEET_CODE.TOPIC,
  getCachedDataMiddleware(CACHE_KEYS.QUESTION.PREFIX, CACHE_KEYS.QUESTION.TOPIC),
  getQuestionInDBMiddleware,
  errorHandler(getQuestionTopicsController)
)
leetCodeRoutes.get(
  ROUTES.LEET_CODE.HINTS,
  getCachedDataMiddleware(CACHE_KEYS.QUESTION.PREFIX, CACHE_KEYS.QUESTION.HINTS),
  getQuestionInDBMiddleware,
  errorHandler(getQuestionHintsController)
)
leetCodeRoutes.get(
  ROUTES.LEET_CODE.TEST_CASE,
  getCachedDataMiddleware(CACHE_KEYS.QUESTION.PREFIX, CACHE_KEYS.QUESTION.TEST_CASE),
  getQuestionInDBMiddleware,
  errorHandler(getQuestionTestcaseController)
)

export default leetCodeRoutes
