import { TopicTag } from '@/models/base.model'
import { LCQuestion } from '@/models/question.model'

// Reponse types for LeetCode API
export interface GetQuestionsResponseAPI {
  data: {
    questions: {
      total: number
      questions: LCQuestion[]
    }
  }
}

export interface GetQuestionResponseAPI {
  data: {
    question: LCQuestion
  }
}

export interface GetQuestionTopicTagsResponseAPI {
  data: {
    question: {
      topicTags: TopicTag[]
    }
  }
}
