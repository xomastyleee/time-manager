import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany
} from 'typeorm'
import { type IUserCreateParams, UserStatus } from '@common/types'
import { BASE_TYPE_PREFERENCES } from '@common/constants'
import { Task } from '@common/db/entities'

@Entity()
export class User {
  constructor(params: IUserCreateParams) {
    if (params) {
      const { username, status, preferences, tasks } = params
      if (username) this.username = username
      if (status) this.status = status as string
      if (preferences) this.preferences = JSON.stringify(preferences)
      if (tasks) this.tasks = tasks
    }
  }

  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  username?: string

  @Column('text', { default: JSON.stringify(BASE_TYPE_PREFERENCES) })
  preferences: string

  @Column('text', { default: String(UserStatus.Inactive) })
  status: string

  @ManyToMany(() => Task, (task) => task.users)
  tasks?: Task[] | undefined

  @CreateDateColumn({ type: 'date' })
  createdAt?: Date

  @UpdateDateColumn({ type: 'date' })
  updatedAt?: Date

  @DeleteDateColumn({ type: 'date' })
  deletedAt?: Date
}
