import leetCodeService from '@/services/leet-code.services'
import { ERROR_MESSAGES } from '@/constants'
import { sendResponse } from '@/utils'
import { Request, Response } from 'express'

// Get all problems
export const getProblemsController = async (req: Request, res: Response) => {
  const reponse = await leetCodeService.getProblems({ categorySlug: '', limit: 10, filters: {}, skip: 0 })
  return sendResponse(res, { message: ERROR_MESSAGES.PROBLEMS.GET_PROBLEMS_SUCCESS, data: reponse })
}

// Check if user can see the problem (premium or not)
export const canSeeProblemController = async (req: Request, res: Response) => {}

// Get a single problem detail
export const getProblemController = async (req: Request, res: Response) => {
  const slug = req.params.slug
  const reponse = await leetCodeService.getProblem(slug)
  return sendResponse(res, { message: ERROR_MESSAGES.PROBLEMS.GET_PROBLEM_SUCCESS, data: reponse })
}

// Get a single problem topics
export const getProblemTopicsController = async (req: Request, res: Response) => {
  const slug = req.params.slug
  const reponse = await leetCodeService.getProblemTopics(slug)
  return sendResponse(res, { message: ERROR_MESSAGES.PROBLEMS.GET_PROBLEM_TOPICS_SUCCESS, data: reponse })
}

export const getProblemTestCasesController = async (req: Request, res: Response) => {}
