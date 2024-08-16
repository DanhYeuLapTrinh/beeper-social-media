import { GET_ALL_PROBLEMS_QUERY, leetCodeAxios } from '@/lib/axios/axios'
import { LeetCodeFilters, LeetCodeProblemsResponseAPI } from '@/models/api/leet-code.api'
import { config } from 'dotenv'

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
}

const leetCodeService = new LeetCodeService()
export default leetCodeService
