import dbServices from './db.services'
import { ObjectId } from 'mongodb'

class QuestionServices {
  // Get topic tags from DB
  async getTopicTags(topicTags: string[]) {
    const topicTagsData = await dbServices.topicTags.find({ slug: { $in: topicTags } }).toArray()
    return { topicTags: topicTagsData }
  }
  // Get similar questions from DB
  async getSimilarQuestions(topicTags: string[]) {
    const similarQuestions = await dbServices.questions
      .find(
        {
          topicTags: { $in: topicTags }
        },
        {
          projection: {
            title: 1,
            titleSlug: 1,
            difficulty: 1
          },
          limit: 20
        }
      )
      .toArray()
    return { similarQuestions }
  }
}

const questionServices = new QuestionServices()
export default questionServices
