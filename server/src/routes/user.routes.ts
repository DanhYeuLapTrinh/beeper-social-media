import { getMeController } from '@/controllers/user.controllers'
import { accessTokenMiddleware } from '@/middlewares/user.middlewares'
import { errorHandler } from '@/utils/handler'
import { config } from 'dotenv'
import { Router } from 'express'

config()

const userRoutes = Router()

userRoutes.get('/me', accessTokenMiddleware, errorHandler(getMeController))

export default userRoutes
