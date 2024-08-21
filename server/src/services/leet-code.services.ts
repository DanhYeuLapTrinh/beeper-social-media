import dbService from './db.services'
import { DBQuestion } from '@/models/question.model'
import {
  GetQuestionsResponseAPI as LeetCodeQuestions,
  GetQuestionResponseAPI as LeetCodeQuestion,
  GetQuestionTopicTagsResponseAPI as LeetCodeTopicTags
} from '@/models/api/leet-code/responses'
import { leetCodeAxios } from '@/lib/axios/axios'
import { Filter } from '@/models/base.model'
import { TitleSlugParamsAPI } from '@/models/api/leet-code/requests'
import { config } from 'dotenv'
import { GET_QUESTION_QUERY, GET_QUESTION_TOPIC_TAGS_QUERY, GET_QUESTIONS_QUERY } from '@/models/api/leet-code/queries'
import { omit } from 'lodash'

config()

if (!process.env.LEET_CODE_URL) {
  throw new Error('LEET_CODE_URL is not defined')
}

class LeetCodeService {
  // Check question in DB
  async checkQuestionInDB(titleSlug: string): Promise<DBQuestion> {
    const questionInDB = await dbService.questions.findOne({ titleSlug })
    if (!questionInDB) {
      const { data: questionData } = await leetCodeService.getQuestion({ titleSlug })
      const { data: questionTopicTags } = await leetCodeService.getQuestionTopicTags({ titleSlug })
      const question = new DBQuestion({
        ...questionData.question,
        topicTags: questionTopicTags.question.topicTags.map((tag) => tag.slug)
      })
      await dbService.questions.updateOne(
        { titleSlug: question.titleSlug },
        { $set: omit(question, ['_id']) },
        { upsert: true }
      )
      // Check if topic tags exist in the database then update them otherwise insert them
      for (const tag of questionTopicTags.question.topicTags) {
        await dbService.topicTags.updateOne({ slug: tag.slug }, { $set: tag }, { upsert: true })
      }
      return question
    }
    return questionInDB as DBQuestion
  }
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
  // Get topic tags from DB
  async getTopicTags(topicTags: string[]) {
    const topicTagsData = await dbService.topicTags.find({ slug: { $in: topicTags } }).toArray()
    return { topicTags: topicTagsData }
  }
}

const leetCodeService = new LeetCodeService()
export default leetCodeService
