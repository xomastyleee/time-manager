import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Check
} from 'typeorm'
import { enumToStrings, logger } from '@common/utils'
import { type INotificationCreateUpdateParams, NotificationType } from '@common/types'

import { User } from './User.entity'

@Entity()
export class Notification {
  constructor(params: INotificationCreateUpdateParams) {
    if (params) {
      const { type, message, isRead } = params
      this.type = type
      this.message = message
      this.isRead = isRead || false
    } else {
      logger.info('Notification Entity init DataSource or params not found, Notification not created')
    }
  }

  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  @Check(`type IN (${enumToStrings(NotificationType)})`)
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
