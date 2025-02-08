import { User } from '@common/db/entities'
import { IUser } from '@common/types'
import { plainToInstance } from 'class-transformer'
import { UserDTO } from '@common/services/dto/user.dto'

export const getUser = (user: User): IUser =>
  plainToInstance(UserDTO, {
    ...user,
    preferences: JSON.parse(user.preferences)
  })
