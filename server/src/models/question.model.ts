import { BaseQuestion, TopicTag } from './base.model'

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
