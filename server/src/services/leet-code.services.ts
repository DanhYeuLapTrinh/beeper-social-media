import { leetCodeAxios } from '@/lib/axios/axios'
import { GET_QUESTION_QUERY, GET_QUESTION_TOPIC_TAGS_QUERY, GET_QUESTIONS_QUERY } from '@/models/api/leet-code/queries'
import { TitleSlugParamsAPI } from '@/models/api/leet-code/requests'
import {
  GetQuestionResponseAPI as LeetCodeQuestion,
  GetQuestionsResponseAPI as LeetCodeQuestions,
  GetQuestionTopicTagsResponseAPI as LeetCodeTopicTags
} from '@/models/api/leet-code/responses'
import { Filter } from '@/models/base.model'
import { config } from 'dotenv'

config()

if (!process.env.LEET_CODE_URL) {
  throw new Error('LEET_CODE_URL is not defined')
}

class LeetCodeServices {
  // Get questions
  async getQuestions(variables: Filter) {
    const {
      data: { data }
    } = await leetCodeAxios.post<LeetCodeQuestions>('', {
      query: GET_QUESTIONS_QUERY,
      variables
    })
    return {
      questions: data.questions.questions,
      total: data.questions.total
    }
  }
  // Get LC question
  async getQuestion(variables: TitleSlugParamsAPI) {
    const { data } = await leetCodeAxios.post<LeetCodeQuestion>('', {
      query: GET_QUESTION_QUERY,
      variables
    })
    return data
  }
  // Get question topic tags
  async getQuestionTopicTags(variables: TitleSlugParamsAPI) {
    const { data } = await leetCodeAxios.post<LeetCodeTopicTags>('', {
      query: GET_QUESTION_TOPIC_TAGS_QUERY,
      variables
    })
    return data
  }
}

const leetCodeServices = new LeetCodeServices()
export default leetCodeServices
