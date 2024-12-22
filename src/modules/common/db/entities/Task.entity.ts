/* eslint-disable max-classes-per-file */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Check,
  OneToMany
} from 'typeorm'
import type { ITaskCreateUpdateParams } from '@common/db/types/interfaces'
import { Priority, TaskStatus, TaskType, DayWeek } from '../types/enams'
import { enumToStrings } from '../util/transformer'
import { logger } from '@common/utils'

@Entity()
export class DayPlan {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  @Check(`day in (${enumToStrings(DayWeek)})`)
  day: string

  @OneToMany(() => Task, (task) => task.id)
  tasks: Task[]

  @CreateDateColumn({ type: 'date' })
  createdAt?: Date

  @UpdateDateColumn({ type: 'date' })
  updatedAt?: Date

  @DeleteDateColumn({ type: 'date' })
  deletedAt?: Date
}

@Entity()
export class Goal {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  name: string

  @Column('text')
  description: string

  @Column('text')
  @Check(`type IN (${enumToStrings(TaskType)})`)
  type: string

  @Column({ type: 'float' })
  progress: number

  @OneToMany(() => Task, (task) => task.GoalId)
  tasks: Task[]

  @CreateDateColumn({ type: 'date' })
  createdAt: Date

  @UpdateDateColumn({ type: 'date' })
  updatedAt: Date

  @DeleteDateColumn({ type: 'date' })
  deletedAt: Date
}

@Entity()
export class Task {
  constructor(params: ITaskCreateUpdateParams) {
    if(params) {
      const { title, priority, taskType, status, startDate, endDate, description, duration, breakDuration } = params
      this.status = status
      this.startDate = startDate
      this.endDate = endDate
      this.title = title
      this.priority = priority
      this.taskType = taskType
      if (description) this.description = description
      if (duration) this.duration = duration
      if (breakDuration) this.breakDuration = breakDuration
    }else {
      logger.info('Task Entity init DataSource or params not found, Task not created')
    }
  }

  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  title: string

  @Column('text')
  description: string

  @Column('text')
  @Check(`priority IN (${enumToStrings(Priority)})`)
  priority: string

  @Column('text')
  @Check(`taskType IN (${enumToStrings(TaskType)})`)
  taskType: string

  @Column('text')
  @Check(`status IN (${enumToStrings(TaskStatus)})`)
  status: string

  @Column('int')
  duration: number

  @Column('int')
  breakDuration: number

  @Column('date')
  startDate: Date

  @Column('date', { nullable: true })
  endDate: Date

  @ManyToOne(() => Goal, (goal) => goal.tasks)
  @JoinColumn({ name: 'GoalId' })
  GoalId: Goal

  @ManyToOne(() => DayPlan, (dayPlan) => dayPlan.tasks)
  @JoinColumn({ name: 'dayPlanId' })
  dayPlanId: DayPlan

  @CreateDateColumn({ type: 'date' })
  createdAt?: Date

  @UpdateDateColumn({ type: 'date' })
  updatedAt?: Date

  @DeleteDateColumn({ type: 'date' })
  deletedAt?: Date
}
