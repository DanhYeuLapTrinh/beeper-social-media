import { GET_ALL_PROBLEMS_QUERY, GET_PROBLEM_QUERY, GET_PROBLEM_TOPICS_QUERY, leetCodeAxios } from '@/lib/axios/axios'
import {
  LeetCodeProblemsRequestAPI,
  LeetCodeProblemResponseAPI,
  LeetCodeProblemTopicsResponseAPI
} from '@/models/api/leet-code.api'
import { config } from 'dotenv'

config()

if (!process.env.LEET_CODE_URL) {
  throw new Error('LEET_CODE_URL is not defined')
}

class LeetCodeService {
  // Get all problems
  // TODO: Add pagination
  async getProblems(variables: LeetCodeProblemsRequestAPI) {
    const {
      data: { data }
    } = await leetCodeAxios.post('', {
      query: GET_ALL_PROBLEMS_QUERY,
      variables
    })
    return data
  }
  // Get a single problem detail
  async getProblem(slug: string) {
    const {
      data: { data }
    } = await leetCodeAxios.post<LeetCodeProblemResponseAPI>('', {
      query: GET_PROBLEM_QUERY,
      variables: {
        titleSlug: slug
      }
    })
    return data
  }
  // Get a single problem topics
  async getProblemTopics(slug: string) {
    const {
      data: { data }
    } = await leetCodeAxios.post<LeetCodeProblemTopicsResponseAPI>('', {
      query: GET_PROBLEM_TOPICS_QUERY,
      variables: {
        titleSlug: slug
      }
    })
    return data
  }
}

const leetCodeService = new LeetCodeService()
export default leetCodeService
