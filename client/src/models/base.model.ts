import { Difficulty } from './problem.model'

export class BaseModel {
  _id?: string
  created_at?: Date
}

export interface BaseAPIResponse {
  message: string
}

// Base Model
export class BaseProblem extends BaseModel {
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
  }: BaseProblem) {
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
