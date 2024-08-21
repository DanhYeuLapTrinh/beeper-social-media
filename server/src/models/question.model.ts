import { BaseQuestion, TopicTag } from './base.model'

export class LCQuestion extends BaseQuestion {
  topicTags: TopicTag[]
  status: string | null
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
    topicTags,
    status
  }: LCQuestion) {
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
    this.status = status
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
  }: DBQuestion) {
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
