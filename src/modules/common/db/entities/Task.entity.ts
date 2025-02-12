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
  JoinTable
} from 'typeorm'
import { type ITaskCreateUpdateParams } from '@common/types'
import { DayPlan, User } from '@common/db/entities'

@Entity()
export class Task {
  constructor(params: ITaskCreateUpdateParams) {
    if (params) {
      const { title, priority, type, description, duration, breakDuration, weekly, dates } = params
      if (title) this.title = title
      if (priority) this.priority = priority
      if (type) this.type = type
      if (description) this.description = description
      if (duration) this.duration = duration
      if (breakDuration) this.breakDuration = breakDuration
      if (weekly) this.weekly = JSON.stringify(weekly)
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

  @ManyToOne(() => DayPlan, (dayPlan) => dayPlan.tasks)
  @JoinColumn({ name: 'dayPlanId' })
  dayPlan: DayPlan

  @CreateDateColumn({ type: 'date' })
  createdAt?: Date

  @UpdateDateColumn({ type: 'date' })
  updatedAt?: Date

  @DeleteDateColumn({ type: 'date' })
  deletedAt?: Date
}
