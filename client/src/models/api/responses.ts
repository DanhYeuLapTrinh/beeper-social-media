import { Difficulty, LCProblem, SimilarQuestion, TopicTag } from '../problem.model'

export interface GetProblemHeaderResponseAPI {
  data: {
    difficulty: Difficulty
    dislikes: number
    frontendQuestionId: string
    isPaidOnly: boolean
    likes: number
    title: string
    titleSlug: string
  }
}

export interface GetProblemContentResponseAPI {
  data: {
    content: string
  }
}

export interface GetProblemTopicsResponseAPI {
  data: {
    topicTags: TopicTag[]
  }
}

export interface GetProblemHintsResponseAPI {
  data: {
    hints: string[]
  }
}

export interface GetProblemSimilarQuestionsResponseAPI {
  data: {
    similarQuestions: SimilarQuestion[]
  }
}

export interface GetProblemTestcaseResponseAPI {
  data: {
    exampleTestcaseList: string[]
  }
}

export interface GetProblemsResponseAPI {
  data: {
    questions: LCProblem[]
    total: number
  }
}
