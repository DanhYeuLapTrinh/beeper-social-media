import { Request } from 'express'
import { User } from '@/models/user.model'
import { TokenPayload } from '@/models/token.model'

declare module 'express' {
  interface Request {
    user?: User
    decoded_token?: TokenPayload
  }
}
