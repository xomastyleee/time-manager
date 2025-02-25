import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { type ICreateHistoryTaskParams, TaskStatus } from '@common/types'
import { Task } from '@common/db/entities/Task.entity'
import dayjs from 'dayjs'

@Entity()
export class HistoryTask {
  constructor(params: ICreateHistoryTaskParams) {
    if (params?.status) {
      this.statusTask = params?.status
      this.task = params.task
      this.durationSpent = 0
      this.breakDurationSpent = 0
      this.createdHistoryDate = dayjs().toISOString()
    }
  }

  @PrimaryGeneratedColumn()
  id: number

  @Column('text', { default: String(TaskStatus.Planned) })
  statusTask: string

  @Column('int', { default: 0 })
  durationSpent: number

  @Column('int', { default: 0 })
  breakDurationSpent: number

  @ManyToOne(() => Task, (task) => task.history, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'taskId' })
  task: Task

  @Column('text', { default: dayjs().toISOString() })
  createdHistoryDate: string

  @CreateDateColumn({ type: 'date' })
  createdAt: Date

  @UpdateDateColumn({ type: 'date' })
  updatedAt?: Date

  @DeleteDateColumn({ type: 'date' })
  deletedAt?: Date
}
