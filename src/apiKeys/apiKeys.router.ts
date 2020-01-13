/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from "express"
import { verifyKey, verifyAdmin } from '../middleware/auth.middleware'
import * as ApiKeyService from "./apiKeys.service"
import { ApiKey } from "./apiKey.entity"

/**
 * Router Definition
 */
export const apiKeysRouter = express.Router()

/**
 * Controller Definitions
 */

apiKeysRouter.use(verifyAdmin)

// GET urls/
apiKeysRouter.get("/", async (req: Request, res: Response) => {
  try {
    const apiKeys: ApiKey[] = await ApiKeyService.findAll()

    res.status(200).send(apiKeys)
  } catch (e) {
    res.status(404).send(e.message)
  }
})

apiKeysRouter.get('/:key', async (req: Request, res: Response) => {
  try {
    const apiKey: ApiKey = await ApiKeyService.find(req.params.key)

    res.status(200).send(apiKey)
  } catch (e) {
    res.status(404).send(e.message)
  }
})

apiKeysRouter.post('/', async (req: Request, res: Response) => {
  try {
    const apiKey: ApiKey = req.body.apiKey

    const record = await ApiKeyService.create(apiKey)

    res.status(201).send(record)
  } catch (e) {
    res.status(404).send(e.message)
  }
})

apiKeysRouter.put('/', async (req: Request, res: Response) => {
  try {
    const apiKey: ApiKey = req.body.apiKey

    const updatedApiKey = await ApiKeyService.update(apiKey)

    res.status(200).send(updatedApiKey)
  } catch (e) {
    res.status(500).send(e.message)
  }
})

apiKeysRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10)
    await ApiKeyService.remove(id)

    res.sendStatus(200)
  } catch (e) {
    res.status(500).send(e.message)
  }
})
