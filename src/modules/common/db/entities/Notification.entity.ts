import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm'
import { type INotificationCreateUpdateParams } from '@common/types'

import { User } from './User.entity'

@Entity()
export class Notification {
  constructor(params: INotificationCreateUpdateParams) {
    if (params) {
      const { type, message, isRead } = params
      this.type = type
      this.message = message
      this.isRead = isRead || false
    }
  }

  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  type: string

  @Column('text')
  message: string

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  userId: User

  @Column({ type: 'boolean', default: false })
  isRead: boolean

  @CreateDateColumn({ type: 'date' })
  createdAt?: Date

  @UpdateDateColumn({ type: 'date' })
  updatedAt?: Date

  @DeleteDateColumn({ type: 'date' })
  deletedAt?: Date
}
