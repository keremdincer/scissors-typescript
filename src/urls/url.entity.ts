import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { ApiKey } from '../apiKeys/apiKey.entity'

@Entity()
export class Url {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ readonly: true })
  originalUrl: string

  @Column({ unique: true, readonly: true })
  shortUrl: string

  @Column({ default: false })
  isPermanent: boolean

  @Column()
  createdAt: Date

  @Column({ nullable: true })
  expiresAt: Date

  @ManyToOne(type => ApiKey, apiKey => apiKey.urls)
  apiKey: ApiKey
}
