/**
 * Required External Modules
 */

import { getRepository } from 'typeorm'
import uuid from 'uuid/v1'
import moment from 'moment'

/**
 * Data Model Interfaces/Entities
 */

import { ApiKey } from './apiKey.entity'

/**
 * Service Methods
 */

export const findAll = async (): Promise<ApiKey[]> => {
  const tokens = await getRepository(ApiKey).find()
  return tokens
}

export const find = async (key: string): Promise<ApiKey> => {
  const record = await getRepository(ApiKey).findOne({ where: { key } })

  if (record) {
    return record
  }

  throw new Error('No record found')
}

export const create = async (newApiKey: ApiKey): Promise<ApiKey> => {

  // Check if username for new token is valid
  const record = await getRepository(ApiKey).findOne({
    where: { username: newApiKey.username }
  })

  if (record) {
    throw new Error('Username already exists')
  }

  newApiKey.key = uuid()
  newApiKey.createdAt = moment().toDate()

  return await getRepository(ApiKey).save(newApiKey)
}

export const update = async (updatedApiKey: ApiKey): Promise<ApiKey> => {
  const apiKey = await getRepository(ApiKey).findOne(updatedApiKey.id)

  if (apiKey) {
    await getRepository(ApiKey).merge(apiKey, updatedApiKey)
    return await getRepository(ApiKey).save(apiKey)
  }

  throw new Error('No record found to update')
}

export const remove = async (id: number): Promise<void> => {
  await getRepository(ApiKey).delete(id)
}
