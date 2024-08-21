import userServices from '@/services/user.services'
import { RESPONSE_MESSAGES } from '@/constants'
import { clerkClient } from '@/middlewares/user.middlewares'
import { TokenPayload } from '@/models/token.model'
import { sendResponse } from '@/utils'
import { Request, Response } from 'express'

export const getMeController = async (req: Request, res: Response) => {
  const { mongo_id, sub } = req.decoded_token as TokenPayload
  const userInMongo = await userServices.getMe(mongo_id)
  const userInClerk = await clerkClient.users.getUser(sub)
  sendResponse(res, {
    message: RESPONSE_MESSAGES.USER.GET_ME,
    data: userInClerk
  })
}
