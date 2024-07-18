import { NextFunction, Request, RequestHandler, Response } from 'express'

export const errorHandler = <T>(func: RequestHandler<T>) => {
  return async (req: Request<T>, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
