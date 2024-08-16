import { GET_ALL_PROBLEMS_QUERY, GET_PROBLEM_QUERY, leetCodeAxios } from '@/lib/axios/axios'
import { LeetCodeFilters, LeetCodeProblemResponseAPI, LeetCodeProblemsResponseAPI } from '@/models/api/leet-code.api'
import { Problem } from '@/models/problem.model'
import { config } from 'dotenv'
import dbService from './db.services'

config()

if (!process.env.LEET_CODE_URL) {
  throw new Error('LEET_CODE_URL is not defined')
}

class LeetCodeService {
  // Get problems
  async getProblems(variables: LeetCodeFilters) {
    const { data } = await leetCodeAxios.post<LeetCodeProblemsResponseAPI>('', {
      query: GET_ALL_PROBLEMS_QUERY,
      variables
    })
    return data
  }
  // Get problem
  async getProblem(variables: { titleSlug: string }) {
    const { data } = await leetCodeAxios.post<LeetCodeProblemResponseAPI>('', {
      query: GET_PROBLEM_QUERY,
      variables
    })
    return data
  }
}

const leetCodeService = new LeetCodeService()
export default leetCodeService
