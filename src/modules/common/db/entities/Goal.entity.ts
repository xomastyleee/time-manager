import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Check
} from 'typeorm'
import { TaskType } from '@common/db/types/enams'
import { enumToStrings } from '@common/db/util/transformer'
import { Task } from './index'

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
