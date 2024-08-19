import { Request } from 'express'
import { User } from '@/models/user.model'
import { TokenPayload } from '@/models/token.model'
import { DBQuestion } from './models/question.model'

declare module 'express' {
  interface Request {
    user?: User
    question?: DBQuestion
    decoded_token?: TokenPayload
  }
}
