import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany
} from 'typeorm'
import { Task } from '@common/db/entities'

@Entity()
export class Statistic {
  constructor(date: Date, tasks: Task[]) {
    this.date = date
    this.plannedTasks = tasks
    this.inProgressTasks = []
    this.completedTasks = []
    this.failedTasks = []
  }

  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'date', unique: true })
  date: Date

  @OneToMany(() => Task, (task) => task.id)
  plannedTasks: Task[]

  @OneToMany(() => Task, (task) => task.id)
  inProgressTasks: Task[]

  @OneToMany(() => Task, (task) => task.id)
  completedTasks: Task[]

  @OneToMany(() => Task, (task) => task.id)
  failedTasks: Task[]

  @CreateDateColumn({ type: 'date' })
  createdAt?: Date

  @UpdateDateColumn({ type: 'date' })
  updatedAt?: Date

  @DeleteDateColumn({ type: 'date' })
  deletedAt?: Date
}
