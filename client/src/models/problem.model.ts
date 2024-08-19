import { BaseProblem, TopicTag } from './base.model'

export class LCProblem extends BaseProblem {
  topicTags: TopicTag[]
  constructor({
    _id,
    created_at,
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
  }: LCProblem) {
    super({
      _id,
      created_at,
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

export class DBProblem extends BaseProblem {
  topicTags: string[]
  constructor({
    _id,
    created_at,
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
  }: DBProblem) {
    super({
      _id,
      created_at,
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
