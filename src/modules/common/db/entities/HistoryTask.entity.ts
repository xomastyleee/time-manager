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

@Entity()
export class HistoryTask {
  constructor(params: ICreateHistoryTaskParams) {
    if (params?.status) {
      this.statusTask = params?.status
      this.task = params.task
    }
  }

  @PrimaryGeneratedColumn()
  id: number

  @Column('text', { default: String(TaskStatus.Planned) })
  statusTask: string

  @ManyToOne(() => Task, (task) => task.history, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'taskId' })
  task: Task

  @CreateDateColumn({ type: 'date' })
  createdAt: Date

  @UpdateDateColumn({ type: 'date' })
  updatedAt?: Date

  @DeleteDateColumn({ type: 'date' })
  deletedAt?: Date
}
