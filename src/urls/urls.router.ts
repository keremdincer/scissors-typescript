/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from "express"
import * as UrlService from "./urls.service"
import { Url } from "./url.entity"
import { Urls } from "./urls.interface"
import { verifyKey } from "../middleware/auth.middleware"

/**
 * Router Definition
 */
export const urlsRouter = express.Router()

/**
 * Apply Middleware
 */
urlsRouter.use(verifyKey)

/**
 * Controller Definitions
 */

// GET urls/
urlsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const urls: Urls = await UrlService.findAll()

    res.status(200).send(urls)
  } catch (e) {
    res.status(404).send(e.message)
  }
})

// GET urls/:id
urlsRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10)

  try {
    const url: Url = await UrlService.find(id)

    res.status(200).send(url)
  } catch (e) {
    res.status(404).send(e.message)
  }
})

// POST urls/
urlsRouter.post("/", async (req: Request, res: Response) => {
  try {
    const url: Url = req.body.url
    const expiration: number = req.body.expiration
    const apiKeyId: number = req.apiKeyId

    const record = await UrlService.create(url, expiration, apiKeyId)
    delete record.apiKey

    res.status(201).send(record)
  } catch (e) {
    res.status(404).send(e.message)
  }
})

// PUT urls/
urlsRouter.put("/", async (req: Request, res: Response) => {
  try {
    const url: Url = req.body.url

    await UrlService.update(url)

    res.sendStatus(200)
  } catch (e) {
    res.status(500).send(e.message)
  }
})

// DELETE urls/:id
urlsRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10)
    await UrlService.remove(id)

    res.sendStatus(200)
  } catch (e) {
    res.status(500).send(e.message)
  }
})
