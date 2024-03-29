import { Request, Response, NextFunction } from "express"

export const logRequest = (
  request: Request,
  response: Response,
  next: NextFunction
) => {

  console.log(`[${request.method}]: ${request.path} ${new Date()}`)
  next()
}
