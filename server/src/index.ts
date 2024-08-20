import userRoutes from '@/routes/user.routes'
import leetCodeRoutes from './routes/leet-code.routes'
import dbService from '@/services/db.services'
import cors from 'cors'
import redisService from './services/redis.services'
import express, { Router } from 'express'
import { ROUTES } from '@/constants'
import { defaultErrorHanler } from '@/middlewares/error.middleware'
import { config } from 'dotenv'

config()

const app = express()
const apiRouter = Router()
const PORT = process.env.PORT || 5000

dbService.connectToDB()
redisService.initRedis()

app.use(express.json())
app.use(cors())

app.use(ROUTES.PREFIX.V1, apiRouter)
apiRouter.use(ROUTES.PREFIX.USER, userRoutes)
apiRouter.use(ROUTES.PREFIX.LEET_CODE, leetCodeRoutes)

app.use(defaultErrorHanler)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
