import leetCodeService from '@/services/leet-code.services'
import { TitleSlugParamsAPI } from '@/models/api/leet-code/requests'
import { NextFunction, Request, Response } from 'express'
import { pick } from 'lodash'

export type FieldsType<T> = Array<keyof T>

// Middleware to pick only the specified fields from the request body
export const pickDataMiddleware =
  <T>(fields: FieldsType<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    req.body = pick(req.body, fields)
    next()
  }

// Middleware to check if the question exists in the database, if not then fetch it from the LeetCode API and save to DB
export const getQuestionInDBMiddleware = async (
  req: Request<TitleSlugParamsAPI>,
  res: Response,
  next: NextFunction
) => {
  const question = await leetCodeService.checkQuestionInDB(req.params.titleSlug)
  req.question = question
  next()
}
