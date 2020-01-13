/**
 * Required External Modules
 */

import { getRepository } from 'typeorm'
import moment from 'moment'
import { generate } from 'shortid'


/**
 * Data Model Interfaces/Entities
 */

import { Url } from './url.entity'
import { Urls } from './urls.interface'


/**
 * Service Methods
 */

export const findAll = async (): Promise<Urls> => {
  const urls = await getRepository(Url).find()
  return urls
}

export const find = async (id: number): Promise<Url> => {
  const record = await getRepository(Url).findOne(id)

  if (record) {
    return record
  }

  throw new Error('No record found')
}

export const findByShortUrl = async (shortUrl: string): Promise<Url> => {
  const record = await getRepository(Url).findOne({ where: { shortUrl } })

  if (record) {
    return record
  }

  throw new Error('No record found')
}

export const create = async (
  newUrl: Url,
  expiration: number,
  apiKeyId: number
): Promise<Url> => {

  // If a short url already exists for the same original url with permanent flag
  // Dont create a new short url, send existing one.
  if (newUrl.isPermanent) {
    const record = await getRepository(Url).findOne({
      where: {
        originalUrl: newUrl.originalUrl,
        isPermanent: true
      }
    })

    if (record) {
      return record
    }
  }

  newUrl.shortUrl = generate()
  newUrl.createdAt = moment().toDate()
  newUrl.apiKey = <any>{ id: apiKeyId }

  if (!newUrl.isPermanent) {
    newUrl.expiresAt = moment().add(expiration, 'days').toDate()
  }

  return await getRepository(Url).save(newUrl)
}

export const update = async (updatedUrl: Url): Promise<Url> => {
  const url = await getRepository(Url).findOne(updatedUrl.id)

  if (url) {
    await getRepository(Url).merge(url, updatedUrl)
    return await getRepository(Url).save(url)
  }

  throw new Error("No record found to update")
}

export const remove = async (id: number): Promise<void> => {
  await getRepository(Url).delete(id)
}
