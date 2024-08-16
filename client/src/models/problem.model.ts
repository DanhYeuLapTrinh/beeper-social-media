import { BaseAPIResponse } from './base.model'

// API Response Backend
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

export interface ProblemsResponseAPI extends BaseAPIResponse {
  data: {
    problemsetQuestionList: {
      total: number
      questions: Problem[]
    }
  }
}

export interface ProblemTopicsResponseAPI extends BaseAPIResponse {
  question: {
    topicTags: { name: string; slug: string }[]
  }
}

export interface LeetCodeFilters {
  categorySlug: string
  limit: number
  skip: number
  filters: {
    difficulty: string
    listId: string
    status: string
    tags: string[]
  }
}

export interface SimilarQuestion {
  title: string
  titleSlug: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  translatedTitle: string | null
}

// Frontend
export type Difficulty = 'Easy' | 'Medium' | 'Hard'

export interface Problem {
  acRate: number
  difficulty: Difficulty
  freqBar: string
  frontendQuestionId: number
  isFavor: boolean
  paidOnly: boolean
  status: string
  title: string
  titleSlug: string
  topicTags: {
    name: string
    id: number
    slug: string
  }[]
  hasSolution: boolean
  hasVideoSolution: boolean
}

export interface ProblemsWithPagination {
  problems: Problem[]
  total: number
}
