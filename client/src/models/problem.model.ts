export type ProblemDetailResponseAPI = {
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
