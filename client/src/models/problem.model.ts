import { BaseAPIResponse } from './base.model'

export interface ProblemDetailResponseAPI extends BaseAPIResponse {
  question: {
    questionId: string
    questionTitle: string
    content: string
    difficulty: 'Easy' | 'Medium' | 'Hard'
    likes: number
    dislikes: number
    hints: string[]
    similarQuestions: string
    exampleTestcases: string
    contributors: string[]
  }
}

export interface ProblemTopicsResponseAPI extends BaseAPIResponse {
  question: {
    topicTags: { name: string; slug: string }[]
  }
}

export interface SimilarQuestion {
  title: string
  titleSlug: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  translatedTitle: string | null
}
