import { getMeController } from '@/controllers/user.controller'
import { accessTokenMiddleware } from '@/middlewares/user.middleware'
import { errorHandler } from '@/utils/handler'
import { config } from 'dotenv'
import { Router } from 'express'

config()

const userRoutes = Router()

userRoutes.get('/me', accessTokenMiddleware, errorHandler(getMeController))

export default userRoutes
