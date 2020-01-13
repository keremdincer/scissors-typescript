import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Url } from '../urls/url.entity'

@Entity()
export class ApiKey {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  key: string

  @Column()
  isActive: boolean

  @Column({ default: false })
  isAdmin: boolean

  @Column()
  createdAt: Date

  @OneToMany(type => Url, url => url.apiKey)
  urls: Url[]
}
