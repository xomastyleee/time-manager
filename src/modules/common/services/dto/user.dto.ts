import { Transform } from 'class-transformer'
import { UserStatusTransformer } from '@common/utils'

import type { IPreferences, ITask, IUser, UserStatus } from '@common/types'

export class UserDTO implements IUser {
  id: number

  username: string

  preferences: IPreferences

  @Transform(UserStatusTransformer)
  status: UserStatus

  tasks: ITask[]

  createdAt?: Date

  updatedAt?: Date

  deletedAt?: Date
}
