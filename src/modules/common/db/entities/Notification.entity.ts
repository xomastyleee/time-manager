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
import { NotificationType } from '@common/db/types/enams'
import { enumToStrings } from '@common/db/util/transformer'
import { User } from './User.entity'

@Entity()
export class Notification {
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