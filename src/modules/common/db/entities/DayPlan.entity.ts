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
import { DayWeek } from '@common/db/types/enams'
import { enumToStrings } from '@common/db/util/transformer'
import { Task } from './index'

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
