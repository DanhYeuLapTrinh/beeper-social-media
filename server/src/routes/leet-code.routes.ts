import { ROUTES } from '@/constants'
import { getProblemController, getProblemsController } from '@/controllers/leet-code.controller'
import { getProblemsMiddleware } from '@/middlewares/leet-code.middleware'
import { errorHandler } from '@/utils/handler'
import { config } from 'dotenv'
import { Router } from 'express'

config()

const leetCodeRoutes = Router()

leetCodeRoutes.post(ROUTES.LEET_CODE.ALL, getProblemsMiddleware, errorHandler(getProblemsController))
leetCodeRoutes.get(ROUTES.LEET_CODE.PROBLEM_DETAIL, errorHandler(getProblemController))

export default leetCodeRoutes
