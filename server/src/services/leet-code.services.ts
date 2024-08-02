import { GET_ALL_PROBLEMS_QUERY, GET_PROBLEM_QUERY, GET_PROBLEM_TOPICS_QUERY, leetCodeAxios } from '@/lib/axios/axios'
import { LeetCodeProblemsRequestAPI } from '@/models/api/req.api'
import { config } from 'dotenv'

config()

if (!process.env.LEET_CODE_URL) {
  throw new Error('LEET_CODE_URL is not defined')
}

class LeetCodeService {
  async getProblems(variables: LeetCodeProblemsRequestAPI) {
    const response = await leetCodeAxios.post('', {
      query: GET_ALL_PROBLEMS_QUERY,
      variables
    })
    return response.data
  }
  async getProblem(slug: string) {
    const response = await leetCodeAxios.post('', {
      query: GET_PROBLEM_QUERY,
      variables: {
        titleSlug: slug
      }
    })
    return response.data
  }
  async getProblemTopics(slug: string) {
    const response = await leetCodeAxios.post('', {
      query: GET_PROBLEM_TOPICS_QUERY,
      variables: {
        titleSlug: slug
      }
    })
    return response.data
  }
}

const leetCodeService = new LeetCodeService()
export default leetCodeService
