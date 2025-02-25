import { Task } from '@common/db/entities'

import { UserStatus } from './enums'
import { IPreferences } from './main.types'

export interface IUserCreateParams {
  status: UserStatus
  username: string
  preferences: IPreferences
  tasks: Task[]
}

export interface IUserUpdateParams {
  status?: UserStatus
  username?: string
  preferences?: IPreferences
  tasks?: Task[]
}
