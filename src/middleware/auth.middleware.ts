import { Request, Response, NextFunction } from "express"
import * as ApiKeyService from '../apiKeys/apiKeys.service'
import { ApiKey } from "../apiKeys/apiKey.entity"
import { errorHandler } from "./error.middleware"

export const verifyAdmin = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const key = request.headers.authorization

  if (!key) {
    return next(errorHandler)
  }

  try {
    const apiKey: ApiKey = await ApiKeyService.find(key)
    if (!apiKey.isAdmin) {
      next(errorHandler)
    }
    request.apiKeyId = apiKey.id
  } catch (e) {
    return next(errorHandler)
  }

  next()
}

export const verifyKey = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const key = request.headers.authorization

  if (!key) {
    return next(errorHandler)
  }

  try {
    const apiKey = await ApiKeyService.find(key)
    request.apiKeyId = apiKey.id
  } catch (e) {
    return next(errorHandler)
  }

  next()
}
