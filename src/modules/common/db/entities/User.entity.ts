import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Check
} from 'typeorm'
import { enumToStrings, logger } from '@common/utils'
import { type IUserCreateUpdateParams, UserStatus } from '@common/types'

@Entity()
export class User {
  constructor(params: IUserCreateUpdateParams) {
    if (params) {
      const { username, status, preferences } = params
      if (username) this.username = username
      if (status) this.status = status
      this.preferences = preferences
    } else {
      logger.info('User Entity init DataSource or params not found, User not created')
    }
  }

  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  username?: string

  @Column('text')
  preferences?: string

  @Column('text')
  @Check(`status IN (${enumToStrings(UserStatus)})`)
  status: string

  @CreateDateColumn({ type: 'date' })
  createdAt?: Date

  @UpdateDateColumn({ type: 'date' })
  updatedAt?: Date

  @DeleteDateColumn({ type: 'date' })
  deletedAt?: Date
}
