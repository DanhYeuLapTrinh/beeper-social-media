import { ROUTES } from '@/constants'
import {
  getQuestionContentController,
  getQuestionHeaderController,
  getQuestionHintsController,
  getQuestionsController,
  getQuestionTestcaseController,
  getQuestionTopicsController
} from '@/controllers/leet-code.controller'
import { getQuestionInDBMiddleware } from '@/middlewares/common.middleware'
import { getQuestionsMiddleware } from '@/middlewares/leet-code.middleware'
import { errorHandler } from '@/utils/handler'
import { config } from 'dotenv'
import { Router } from 'express'

config()

const leetCodeRoutes = Router()

leetCodeRoutes.post(ROUTES.LEET_CODE.ALL, getQuestionsMiddleware, errorHandler(getQuestionsController))
leetCodeRoutes.get(ROUTES.LEET_CODE.QUESTION, getQuestionInDBMiddleware, errorHandler(getQuestionHeaderController))
leetCodeRoutes.get(ROUTES.LEET_CODE.CONTENT, getQuestionInDBMiddleware, errorHandler(getQuestionContentController))
leetCodeRoutes.get(ROUTES.LEET_CODE.TOPIC, getQuestionInDBMiddleware, errorHandler(getQuestionTopicsController))
leetCodeRoutes.get(ROUTES.LEET_CODE.HINTS, getQuestionInDBMiddleware, errorHandler(getQuestionHintsController))
leetCodeRoutes.get(ROUTES.LEET_CODE.TEST_CASE, getQuestionInDBMiddleware, errorHandler(getQuestionTestcaseController))

export default leetCodeRoutes
