import HttpException from "../common/http-exception"
import { Request, Response, NextFunction } from "express"

export const errorHandler = (
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const status = error.status || 500
  const message =
    error.message || "It's not you. It's us. We are having some problems."

  // Respond with page
  if (request.accepts('html')) {
    response.render('error', { ...error })
    return
  }

  // Respond with json
  if (request.accepts('json')) {
    response.send({ error: 'Not found ' })
    return
  }

  response.type('txt').send(message)
}
