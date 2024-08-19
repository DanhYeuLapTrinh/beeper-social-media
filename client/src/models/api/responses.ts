import { LCProblem } from '../problem.model'

export interface GetProblemResponseAPI {
  data: LCProblem
}

export interface GetProblemsResponseAPI {
  data: {
    questions: LCProblem[]
    total: number
  }
}
