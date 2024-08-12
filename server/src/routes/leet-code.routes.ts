import {
  getProblemController,
  getProblemsController,
  getProblemTopicsController
} from '@/controllers/leet-code.controller'
import { config } from 'dotenv'
import { Router } from 'express'
import { errorHandler } from '@/utils/handler'
import { slugMiddleware } from '@/middlewares/leet-code.middleware'

config()

const leetCodeRoutes = Router()

leetCodeRoutes.get('/all', errorHandler(getProblemsController))

leetCodeRoutes.get('/:slug', errorHandler(getProblemController))

leetCodeRoutes.get('/:slug/topic', slugMiddleware, errorHandler(getProblemTopicsController))

export default leetCodeRoutes
