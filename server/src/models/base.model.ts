import { ObjectId } from 'mongodb'

export class BaseModel {
  _id?: ObjectId
  clerk_id?: string
  created_at?: Date
}
