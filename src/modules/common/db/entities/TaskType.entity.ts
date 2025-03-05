import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn
} from 'typeorm'
import { type ITaskType } from '@common/types'
import { Task, User } from '@common/db/entities'
import { getUserEntity } from '@modules/common/services/transformers'

@Entity()
export class TaskType {
  constructor(params: Partial<ITaskType>) {
    if (params) {
      const { title, description, user } = params
      if (title) this.title = title
      if (description) this.description = description
      if (user) this.user = getUserEntity(user)
    }
  }

  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  title: string

  @Column('text')
  description: string

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User

  @OneToMany(() => Task, (task) => task.type)
  tasks?: Task[]

  @CreateDateColumn({ type: 'date' })
  createdAt: Date

  @UpdateDateColumn({ type: 'date' })
  updatedAt?: Date

  @DeleteDateColumn({ type: 'date' })
  deletedAt?: Date
}
