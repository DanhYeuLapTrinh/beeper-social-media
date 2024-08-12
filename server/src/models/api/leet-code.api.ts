import { ParamsDictionary } from 'express-serve-static-core'

export interface LeetCodeProblemsRequestAPI {
  categorySlug: string
  limit: number
  skip: number
  filters: any
}

export interface LeetCodeProblemResponseAPI {
  data: {
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
}

export interface LeetCodeProblemTopicsResponseAPI {
  data: {
    question: {
      topicTags: {
        name: string
        slug: string
      }[]
    }
  }
}

export interface GetProblemRequestParams extends ParamsDictionary {
  slug: string
}
