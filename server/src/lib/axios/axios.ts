import axios from 'axios'

export const leetCodeAxios = axios.create({
  baseURL: process.env.LEET_CODE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const GET_ALL_PROBLEMS_QUERY = `
query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
  problemsetQuestionList: questionList(
    categorySlug: $categorySlug
    limit: $limit
    skip: $skip
    filters: $filters
  ) {
    total: totalNum
    questions: data {
      acRate
      difficulty
      freqBar
      frontendQuestionId: questionFrontendId
      isFavor
      paidOnly: isPaidOnly
      status
      title
      titleSlug
      topicTags {
        name
        id
        slug
      }
      hasSolution
      hasVideoSolution
    }
  }
}
`

export const GET_PROBLEM_QUERY = `
query getQuestionDetail($titleSlug: String!) { 
  question(titleSlug: $titleSlug) { 
    questionId 
    questionTitle 
    content 
    difficulty 
    likes 
    hints
    dislikes 
    similarQuestions
    contributors 
    { username profileUrl } 
  } 
}
`

export const GET_PROBLEM_TOPICS_QUERY = `
query singleQuestionTopicTags($titleSlug: String!) {
  question(titleSlug: $titleSlug) {
    topicTags {
      name      
      slug    
    }  
  }
}
`
