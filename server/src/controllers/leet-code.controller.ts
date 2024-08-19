import leetCodeService from '@/services/leet-code.services'
import { ERROR_MESSAGES } from '@/constants'
import { pickData, sendResponse } from '@/utils'
import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { TitleSlugParamsAPI } from '@/models/api/leet-code/requests'
import { Filter } from '@/models/base.model'
import { DBQuestion } from '@/models/question.model'

// Get questions controller
export const getQuestionsController = async (req: Request<ParamsDictionary, any, Filter>, res: Response) => {
  const data = await leetCodeService.getQuestions(req.body)
  sendResponse(res, { message: ERROR_MESSAGES.QUESTIONS.GET_QUESTIONS_SUCCESS, data })
}

// Get question header controller
export const getQuestionHeaderController = async (req: Request<TitleSlugParamsAPI>, res: Response) => {
  const question = req.question as DBQuestion
  sendResponse(res, {
    message: ERROR_MESSAGES.QUESTIONS.GET_QUESTION_SUCCESS,
    data: pickData(question, [
      'difficulty',
      'likes',
      'dislikes',
      'isPaidOnly',
      'frontendQuestionId',
      '_id',
      'title',
      'titleSlug'
    ])
  })
}

// Get question content controller
export const getQuestionContentController = async (req: Request<TitleSlugParamsAPI>, res: Response) => {
  const question = req.question as DBQuestion
  sendResponse(res, {
    message: ERROR_MESSAGES.QUESTIONS.GET_QUESTION_SUCCESS,
    data: pickData(question, ['content'])
  })
}

// Get question topics controller
export const getQuestionTopicsController = async (req: Request<TitleSlugParamsAPI>, res: Response) => {
  const question = req.question as DBQuestion
  sendResponse(res, {
    message: ERROR_MESSAGES.QUESTIONS.GET_QUESTION_SUCCESS,
    data: pickData(question, ['topicTags'])
  })
}

// Get question hints controller
export const getQuestionHintsController = async (req: Request<TitleSlugParamsAPI>, res: Response) => {
  const question = req.question as DBQuestion
  sendResponse(res, {
    message: ERROR_MESSAGES.QUESTIONS.GET_QUESTION_SUCCESS,
    data: pickData(question, ['hints'])
  })
}

// Get question example test cases controller
export const getQuestionTestcaseController = async (req: Request<TitleSlugParamsAPI>, res: Response) => {
  const question = req.question as DBQuestion
  sendResponse(res, {
    message: ERROR_MESSAGES.QUESTIONS.GET_QUESTION_SUCCESS,
    data: pickData(question, ['exampleTestcaseList'])
  })
}

// TODO: Get question similar controller
