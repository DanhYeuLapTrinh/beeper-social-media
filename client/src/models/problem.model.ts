import { BaseModel, BaseProblem } from './base.model'

export type Difficulty = 'Easy' | 'Medium' | 'Hard'

export interface Filter {
  difficulty: string
  listId: string
  status: string
  tags: string[]
}

export interface GetProblemsFilter {
  categorySlug: string
  limit: number
  skip: number
  filters: Filter | object
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

export class LCProblem extends BaseProblem {
  topicTags: TopicTag[]
  status: string | null
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
    hasVideoSolution,
    topicTags,
    status
  }: LCProblem) {
    super({
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
    })
    this.topicTags = topicTags
    this.status = status
  }
}

export class DBProblem extends BaseProblem {
  topicTags: string[]
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
    hasVideoSolution,
    topicTags
  }: DBProblem) {
    super({
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
    })
    this.topicTags = topicTags
  }
}

export interface SimilarQuestion {
  _id: string
  title: string
  titleSlug: string
  difficulty: Difficulty
  isPaidOnly: boolean
}
