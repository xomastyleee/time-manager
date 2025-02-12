import { IPreferences, IUser, UserStatus } from '@common/types'
import { Transform } from 'class-transformer'
import { UserStatusTransformer } from '@common/utils'
import { Task } from '@common/db/entities'

export class UserDTO implements IUser {
  id: number

  username: string

  preferences: IPreferences

  @Transform(UserStatusTransformer)
  status: UserStatus

  tasks: Task[]

  createdAt?: Date

  updatedAt?: Date

  deletedAt?: Date
}
