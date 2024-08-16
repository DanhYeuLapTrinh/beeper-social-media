import { Difficulty } from '../base.model'
import { Problem } from '../problem.model'

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

export interface GetProblemParamsAPI {
  titleSlug: string
}

export interface LeetCodeProblemsResponseAPI {
  data: {
    problemsetQuestionList: {
      total: number
      questions: {
        title: string
        titleSlug: string
        difficulty: Difficulty
        frontendProblemId: number
        isFavor: boolean
        paidOnly: boolean
        status: string
        topicTags: {
          name: string
          id: number
          slug: string
        }[]
        acRate: number
        hasSolution: boolean
        hasVideoSolution: boolean
      }[]
    }
  }
}

export interface LeetCodeProblemResponseAPI {
  data: {
    question: Problem
  }
}
