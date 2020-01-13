/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from "express"
import { logRequest } from '../middleware/logger.middleware'
import * as UrlService from '../urls/urls.service'
import { Url } from "../urls/url.entity"

/**
 * Router Definition
 */
export const redirector = express.Router()

/**
 * Apply Middleware
 */
redirector.use(logRequest)

redirector.get('/:shortUrl', async (req: Request, res: Response) => {
  try {
    const shortUrl: string = req.params.shortUrl
    const record: Url = await UrlService.findByShortUrl(shortUrl)

    res.redirect(record.originalUrl)
  } catch (e) {
    res.render('error', {
      status: '404',
      message: 'Ulaşmak istediğiniz link kullanılamıyor. ' +
        'Link için kullanım süresi dolmuş olabilir.'
    })
  }
})
