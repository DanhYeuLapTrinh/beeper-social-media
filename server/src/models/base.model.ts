import { ObjectId } from 'mongodb'

export type Difficulty = 'Easy' | 'Medium' | 'Hard'

export interface Filter {
  difficulty: string
  listId: string
  status: string
  tags: string[]
}

export interface TopicTag {
  name: string
  slug: string
}

export interface BaseQuestionType {
  title: string
  titleSlug: string
  difficulty: Difficulty
  content: string
  likes: number
  dislikes: number
  isPaidOnly: number
  frontendQuestionId: number
  exampleTestcaseList: string[]
  hints: string[]
  acRate: number
  hasSolution: boolean
  hasVideoSolution: boolean
}
// Base Model
export class BaseModel {
  _id?: ObjectId
  clerk_id?: string
  created_at?: Date
}

export class BaseQuestion extends BaseModel {
  title: string
  titleSlug: string
  difficulty: Difficulty
  content: string
  likes: number
  dislikes: number
  isPaidOnly: number
  frontendQuestionId: number
  exampleTestcaseList: string[]
  hints: string[]
  acRate: number
  hasSolution: boolean
  hasVideoSolution: boolean
  constructor({
    _id,
    title,
    titleSlug,
    difficulty,
    content,
    likes,
    dislikes,
    isPaidOnly,
    frontendQuestionId,
    exampleTestcaseList,
    hints,
    acRate,
    hasSolution,
    hasVideoSolution
  }: BaseQuestionType & Partial<BaseModel>) {
    super()
    this._id = _id
    this.title = title
    this.titleSlug = titleSlug
    this.difficulty = difficulty
    this.content = content
    this.likes = likes
    this.dislikes = dislikes
    this.isPaidOnly = isPaidOnly
    this.frontendQuestionId = frontendQuestionId
    this.exampleTestcaseList = exampleTestcaseList
    this.hints = hints
    this.acRate = acRate
    this.hasSolution = hasSolution
    this.hasVideoSolution = hasVideoSolution
  }
}
