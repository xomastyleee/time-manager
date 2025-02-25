import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany
} from 'typeorm'
import { type ITaskCreateParams } from '@common/types'
import { HistoryTask, User } from '@common/db/entities'
import { getUserEntity } from '@common/services/transformers'

@Entity()
export class Task {
  constructor(params: ITaskCreateParams) {
    if (params) {
      const { title, type, description, duration, breakDuration, dates, user } = params
      if (title) this.title = title
      if (type) this.type = type
      if (description) this.description = description
      if (duration) this.duration = duration
      if (user) this.users = [getUserEntity(user)]
      if (breakDuration) this.breakDuration = breakDuration
      if (dates) this.dates = JSON.stringify(dates.map((date) => date.toISOString()))
    }
  }

  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  title: string

  @Column('text')
  description: string

  @Column('text')
  type: string

  @Column('text')
  dates: string

  @Column('int')
  duration: number

  @Column('int')
  breakDuration: number

  @ManyToMany(() => User, (user) => user.tasks)
  @JoinTable({
    name: 'task_users',
    joinColumn: { name: 'taskId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' }
  })
  users?: User[]

  @OneToMany(() => HistoryTask, (historyTask) => historyTask.task)
  history?: HistoryTask[]

  @CreateDateColumn({ type: 'date' })
  createdAt?: Date

  @UpdateDateColumn({ type: 'date' })
  updatedAt?: Date

  @DeleteDateColumn({ type: 'date', nullable: true })
  deletedAt?: Date
}
