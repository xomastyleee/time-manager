import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm'
import { type ITaskCreateUpdateParams } from '@common/types'
import { DayPlan } from '@common/db/entities'

@Entity()
export class Task {
  constructor(params: ITaskCreateUpdateParams) {
    if (params) {
      const { title, priority, type, status, startDate, endDate, description, duration, breakDuration } = params
      this.status = status
      this.startDate = startDate
      this.endDate = endDate
      this.title = title
      this.priority = priority
      this.type = type
      if (description) this.description = description
      if (duration) this.duration = duration
      if (breakDuration) this.breakDuration = breakDuration
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
  status: string

  @Column('int')
  duration: number

  @Column('int')
  breakDuration: number

  @Column('date')
  startDate: Date

  @Column('date', { nullable: true })
  endDate: Date

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
