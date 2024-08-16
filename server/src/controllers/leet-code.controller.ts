import leetCodeService from '@/services/leet-code.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { Request, Response } from 'express'
import { LeetCodeFilters } from '@/models/api/leet-code.api'
import { sendResponse } from '@/utils'
import { ERROR_MESSAGES } from '@/constants'

export const getProblemsController = async (req: Request<ParamsDictionary, any, LeetCodeFilters>, res: Response) => {
  const data = await leetCodeService.getProblems(req.body)
  sendResponse(res, { message: ERROR_MESSAGES.PROBLEMS.GET_PROBLEMS_SUCCESS, data })
}
