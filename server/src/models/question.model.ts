import { BaseModel, BaseQuestion, BaseQuestionType, TopicTag } from './base.model'

interface LCQuestionType {
  topicTags: TopicTag[]
}

interface DBQuestionType {
  topicTags: string[]
}

export class LCQuestion extends BaseQuestion {
  topicTags: TopicTag[]
  constructor({
    _id,
    title,
    titleSlug,
    difficulty,
    content,
    likes,
    dislikes,
    isPaidOnly,
    frontendQuestionId,
    exampleTestcaseList,
    hints,
    acRate,
    hasSolution,
    hasVideoSolution,
    topicTags
  }: BaseQuestionType & Partial<BaseModel> & LCQuestionType) {
    super({
      _id,
      title,
      titleSlug,
      difficulty,
      content,
      likes,
      dislikes,
      isPaidOnly,
      frontendQuestionId,
      exampleTestcaseList,
      hints,
      acRate,
      hasSolution,
      hasVideoSolution
    })
    this.topicTags = topicTags
  }
}

export class DBQuestion extends BaseQuestion {
  topicTags: string[]
  constructor({
    _id,
    title,
    titleSlug,
    difficulty,
    content,
    likes,
    dislikes,
    isPaidOnly,
    frontendQuestionId,
    exampleTestcaseList,
    hints,
    acRate,
    hasSolution,
    hasVideoSolution,
    topicTags
  }: BaseQuestionType & Partial<BaseModel> & DBQuestionType) {
    super({
      _id,
      title,
      titleSlug,
      difficulty,
      content,
      likes,
      dislikes,
      isPaidOnly,
      frontendQuestionId,
      exampleTestcaseList,
      hints,
      acRate,
      hasSolution,
      hasVideoSolution
    })
    this.topicTags = topicTags
  }
}
