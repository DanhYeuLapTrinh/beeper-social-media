import { ObjectId } from 'mongodb'
import { BaseModel } from './base.model'
import { USER_STATUS } from '@/constants'

export class User extends BaseModel {
  name: string
  email: string
  updated_at: Date
  date_of_birth: Date
  username: string
  password: string
  status: USER_STATUS
  bio: string
  location: string
  website: string
  avatar: string
  cover_photo: string
  constructor({
    _id,
    clerk_id,
    created_at,
    updated_at,
    name,
    email,
    date_of_birth,
    username,
    password,
    status,
    bio,
    location,
    website,
    avatar,
    cover_photo
  }: {
    _id?: ObjectId
    clerk_id?: string
    created_at?: Date
    updated_at?: Date
    name: string
    email: string
    date_of_birth: Date
    username?: string
    password: string
    status?: USER_STATUS
    bio?: string
    location?: string
    website?: string
    avatar?: string
    cover_photo?: string
  }) {
    super()
    const date = new Date()
    this._id = _id
    this.clerk_id = clerk_id
    this.created_at = created_at || date
    this.updated_at = updated_at || date
    this.name = name
    this.email = email
    this.date_of_birth = date_of_birth
    this.username = username || ''
    this.password = password
    this.status = status || USER_STATUS.NORMAL
    this.bio = bio || ''
    this.location = location || ''
    this.website = website || ''
    this.avatar = avatar || ''
    this.cover_photo = cover_photo || ''
  }
}
