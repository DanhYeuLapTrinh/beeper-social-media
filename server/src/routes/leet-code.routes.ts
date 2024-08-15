import { ROUTES } from '@/constants'
import { getProblemsController } from '@/controllers/leet-code.controller'
import { getProblemsMiddleware } from '@/middlewares/leet-code.middleware'
import { errorHandler } from '@/utils/handler'
import { config } from 'dotenv'
import { Router } from 'express'

config()

const leetCodeRoutes = Router()

leetCodeRoutes.post(ROUTES.LEET_CODE.ALL, getProblemsMiddleware, errorHandler(getProblemsController))

export default leetCodeRoutes
