import { ObjectId } from 'mongodb'

export type Difficulty = 'Easy' | 'Medium' | 'Hard'

export interface Filter {
  difficulty: string
  listId: string
  status: string
  tags: string[]
}

// Base Model
export class BaseModel {
  _id?: ObjectId
  created_at?: Date
}

export class TopicTag extends BaseModel {
  name: string
  slug: string
  constructor({ _id, name, slug }: TopicTag) {
    super()
    this._id = _id
    this.name = name
    this.slug = slug
  }
}

export class BaseQuestion extends BaseModel {
  title: string
  titleSlug: string
  difficulty: Difficulty
  content: string
  likes: number
  dislikes: number
  isPaidOnly: boolean
  frontendQuestionId: number
  exampleTestcaseList: string[]
  hints: string[]
  acRate: number
  hasSolution: boolean
  hasVideoSolution: boolean
  constructor({
    _id,
    created_at,
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
  }: BaseQuestion) {
    super()
    this._id = _id
    this.created_at = created_at || new Date()
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
