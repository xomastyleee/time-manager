import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Task } from '@common/db/entities/Task.entity'

@Entity()
export class DayPlan {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  day: string

  @OneToMany(() => Task, (task) => task.dayPlan)
  tasks: Task[]

  @CreateDateColumn({ type: 'date' })
  createdAt?: Date

  @UpdateDateColumn({ type: 'date' })
  updatedAt?: Date

  @DeleteDateColumn({ type: 'date' })
  deletedAt?: Date
}
