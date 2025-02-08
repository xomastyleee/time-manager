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
  OneToMany
} from 'typeorm'
import { type ITaskCreateUpdateParams } from '@common/types'

@Entity()
export class DayPlan {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
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
    if (params) {
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
  taskType: string

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
