import { JwtPayload } from '@clerk/types'

export interface TokenPayload extends JwtPayload {
  email_verified: boolean
  mongo_id: string
  permissons: string
}
