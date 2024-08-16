import { Difficulty } from './base.model'

export class Problem {
  title: string
  titleSlug: string
  difficulty: Difficulty
  content: string
  likes: number
  dislikes: number
  isPaidOnly: number
  frontendProblemId: number
  exampleTestcaseList: string[]
  hints: string[]
  acRate: number
  hasSolution: boolean
  hasVideoSolution: boolean
  topicTags: {
    name: string
    id: number
    slug: string
  }[]
  constructor({
    title,
    titleSlug,
    difficulty,
    content,
    likes,
    dislikes,
    isPaidOnly,
    frontendProblemId,
    exampleTestcaseList,
    hints,
    acRate,
    hasSolution,
    hasVideoSolution,
    topicTags
  }: {
    title: string
    titleSlug: string
    difficulty: Difficulty
    content: string
    likes: number
    dislikes: number
    isPaidOnly: number
    frontendProblemId: number
    exampleTestcaseList: string[]
    hints: string[]
    acRate: number
    hasSolution: boolean
    hasVideoSolution: boolean
    topicTags: {
      name: string
      id: number
      slug: string
    }[]
  }) {
    this.title = title
    this.titleSlug = titleSlug
    this.difficulty = difficulty
    this.content = content
    this.likes = likes
    this.dislikes = dislikes
    this.isPaidOnly = isPaidOnly
    this.frontendProblemId = frontendProblemId
    this.exampleTestcaseList = exampleTestcaseList
    this.hints = hints
    this.acRate = acRate
    this.hasSolution = hasSolution
    this.hasVideoSolution = hasVideoSolution
    this.topicTags = topicTags
  }
}
