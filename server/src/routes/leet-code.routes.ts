import {
  canSeeProblemController,
  getProblemController,
  getProblemsController,
  getProblemTestCasesController,
  getProblemTopicsController
} from '@/controllers/leet-code.controller'
import { config } from 'dotenv'
import { Router } from 'express'
import { errorHandler } from '@/utils/handler'
import { slugMiddleware } from '@/middlewares/leet-code.middleware'
import { ROUTES } from '@/constants'

config()

const leetCodeRoutes = Router()

leetCodeRoutes.get(ROUTES.LEET_CODE.ALL, errorHandler(getProblemsController))

leetCodeRoutes.get(ROUTES.LEET_CODE.CAN_SEE_PROBLEM, errorHandler(canSeeProblemController))

leetCodeRoutes.get(ROUTES.LEET_CODE.PROBLEM_DETAIL, errorHandler(getProblemController))

leetCodeRoutes.get(ROUTES.LEET_CODE.TOPIC, slugMiddleware, errorHandler(getProblemTopicsController))

leetCodeRoutes.get(ROUTES.LEET_CODE.TEST_CASE, slugMiddleware, errorHandler(getProblemTestCasesController))

export default leetCodeRoutes
