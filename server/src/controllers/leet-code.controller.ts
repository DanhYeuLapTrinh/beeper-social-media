import dbService from '@/services/db.services'
import leetCodeService from '@/services/leet-code.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { Request, Response } from 'express'
import { GetProblemParamsAPI, LeetCodeFilters } from '@/models/api/leet-code.api'
import { sendResponse } from '@/utils'
import { ERROR_MESSAGES } from '@/constants'

// Get problems controller
export const getProblemsController = async (req: Request<ParamsDictionary, any, LeetCodeFilters>, res: Response) => {
  const data = await leetCodeService.getProblems(req.body)
  sendResponse(res, { message: ERROR_MESSAGES.PROBLEMS.GET_PROBLEMS_SUCCESS, data })
}

// Get problem controller
export const getProblemController = async (req: Request<GetProblemParamsAPI>, res: Response) => {
  const problemInDB = await dbService.problems.findOne({ titleSlug: req.params.titleSlug })
  if (problemInDB) {
    sendResponse(res, { message: ERROR_MESSAGES.PROBLEMS.GET_PROBLEM_SUCCESS, data: problemInDB })
  } else {
    const { data } = await leetCodeService.getProblem({ titleSlug: req.params.titleSlug })
    sendResponse(res, { message: ERROR_MESSAGES.PROBLEMS.GET_PROBLEM_SUCCESS, data: data.question })
    await dbService.problems.insertOne(data.question)
  }
}
