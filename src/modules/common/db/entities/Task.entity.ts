import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany
} from 'typeorm'
import { type ITaskCreateUpdateParams, TaskStatus} from '@common/types'
import { DayPlan, HistoryTask, User } from '@common/db/entities'
import { logger } from '@common/utils'

@Entity()
export class Task {
  constructor(params: ITaskCreateUpdateParams) {
    if (params) {
      const { title, priority, type, description, duration, breakDuration, weekly, dates, status } = params
      logger.info('create new task', status)
      if (title) this.title = title
      if (priority) this.priority = priority
      if (type) this.type = type
      if (description) this.description = description
      if (duration) this.duration = duration
      if (status) this.status = status
      this.breakDuration = breakDuration && breakDuration > 0 ? breakDuration : 0
      this.weekly = weekly ? JSON.stringify(weekly) : '[]'
      this.dates = dates ? JSON.stringify(dates.map((date) => date.toISOString())) : '[]'
    }
  }

  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  title: string

  @Column('text')
  description: string

  @Column('text')
  priority: string

  @Column('text')
  type: string

  @Column('text', { default: String(TaskStatus.Planned) })
  status: string

  @Column('text')
  weekly: string

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

  @ManyToOne(() => DayPlan, (dayPlan) => dayPlan.tasks)
  @JoinColumn({ name: 'dayPlanId' })
  dayPlan: DayPlan

  @CreateDateColumn({ type: 'date', nullable: true })
  dataEnd?: Date

  @CreateDateColumn({ type: 'date' })
  createdAt?: Date

  @UpdateDateColumn({ type: 'date' })
  updatedAt?: Date

  @DeleteDateColumn({ type: 'date', nullable: true })
  deletedAt?: Date
}
