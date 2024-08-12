import { BaseAPIResponse } from './base.model'

export interface ProblemDetailResponseAPI extends BaseAPIResponse {
  question: {
    questionId: string
    questionTitle: string
    content: string
    difficulty: string
    likes: number
    dislikes: number
    hints: string[]
    similarQuestions: string[]
    exampleTestcases: string
    contributors: string[]
  }
}
