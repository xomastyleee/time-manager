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
import { Task } from '@common/db/entities/Task.entity'
import { type ICreateHistoryTaskParams } from '@common/types'

@Entity()
export class HistoryTask {
  constructor(params: ICreateHistoryTaskParams) {
    const { task } = params
    if (task) this.task = task
    if (task?.status) this.statusTask = task?.status
  }

  @PrimaryGeneratedColumn()
  id: number

  @Column('int')
  taskId: number

  @Column('text')
  statusTask: string

  @ManyToOne(() => Task, (task) => task.history, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'taskId' })
  task: Task

  @CreateDateColumn({ type: 'date' })
  createdAt?: Date

  @UpdateDateColumn({ type: 'date' })
  updatedAt?: Date

  @DeleteDateColumn({ type: 'date' })
  deletedAt?: Date
}
