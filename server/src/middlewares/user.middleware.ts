import dbService from '@/services/db.services'
import { ERROR_MESSAGES, HTTP_STATUS_CODES } from '@/constants'
import { TokenPayload } from '@/models/token.model'
import { validate } from '@/utils/validator'
import { createClerkClient } from '@clerk/clerk-sdk-node'
import { config } from 'dotenv'
import { Request } from 'express'
import { UnauthorizedError } from 'express-oauth2-jwt-bearer'
import { checkSchema } from 'express-validator'
import { ObjectId } from 'mongodb'
import { BaseError } from '@/models/api/common'

config()

export const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY
})

export const accessTokenMiddleware = validate(
  checkSchema(
    {
      authorization: {
        trim: true,
        custom: {
          options: async (value: string, { req }) => {
            // Split the Bearer and the token
            const access_token = (value || '').split(' ')[1]
            if (!access_token) {
              throw new UnauthorizedError()
            }
            try {
              // Use clerk service to verify the token
              const decoded_token = (await clerkClient.verifyToken(access_token as string)) as TokenPayload
              // Find the user in the database
              const user = await dbService.users.findOne({ _id: new ObjectId(decoded_token.mongo_id) })
              // If the user is not found, throw an error
              if (!user) {
                throw new BaseError({
                  message: ERROR_MESSAGES.GENERAL.USER_NOT_FOUND,
                  status: HTTP_STATUS_CODES.NOT_FOUND
                })
              }
              ;(req as Request).decoded_token = decoded_token
            } catch (error) {
              if (error instanceof BaseError) {
                throw new BaseError({
                  message: error.message,
                  status: error.status
                })
              }
              throw error
            }
            return true
          }
        }
      }
    },
    ['headers']
  )
)
