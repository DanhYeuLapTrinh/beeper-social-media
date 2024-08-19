export const GET_QUESTIONS_QUERY = `
query QUESTIONsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
  questions: questionList(
    categorySlug: $categorySlug
    limit: $limit
    skip: $skip
    filters: $filters
  ) {
    total: totalNum
    questions: data {
      acRate
      difficulty
      frontendQuestionId: questionFrontendId
      isFavor
      isPaidOnly
      status
      title
      titleSlug
      topicTags {
        name
        slug
      }
      hasSolution
      hasVideoSolution
    }
  }
}
`

export const GET_QUESTION_QUERY = `
query getQuestionDetail($titleSlug: String!) { 
  question(titleSlug: $titleSlug) { 
    acRate
    frontendQuestionId: questionFrontendId
    title
    titleSlug 
    content 
    difficulty 
    likes 
    hints
    dislikes 
    isPaidOnly
    hasSolution
    hasVideoSolution
    exampleTestcaseList
  } 
}
`

export const GET_QUESTION_TOPIC_TAGS_QUERY = `
query singleQuestionTopicTags($titleSlug: String!) {
    question(titleSlug: $titleSlug) {
        topicTags {
            name      
            slug    
        }  
    }
}
`

export const GET_QUESTION_OF_TODAY_QUERY = `
query questionOfToday {
  activeDailyCodingChallengeQuestion {
    date
    userStatus
    link
    question {
      acRate
      difficulty
      freqBar
      frontendQuestionId: questionFrontendId
      isFavor
      paidOnly: isPaidOnly
      status
      title
      titleSlug
      hasVideoSolution
      hasSolution
      topicTags {
        name
        slug
      }
    }
  }
}
`
