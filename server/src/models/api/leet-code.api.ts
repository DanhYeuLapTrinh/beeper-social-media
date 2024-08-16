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

export interface LeetCodeProblemsResponseAPI {
  data: {
    problemsetQuestionList: {
      total: number
      questions: {
        acRate: number
        difficulty: string
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
      }[]
    }
  }
}
