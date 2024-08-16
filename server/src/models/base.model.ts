import { ObjectId } from 'mongodb'

export class BaseModel {
  _id?: ObjectId
  clerk_id?: string
  created_at?: Date
}

export type Difficulty = 'Easy' | 'Medium' | 'Hard'
