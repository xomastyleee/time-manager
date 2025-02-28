import { User } from '@common/db/entities'
import { IUser } from '@common/types'
import { plainToInstance } from 'class-transformer'
import { UserDTO } from '@common/services/dto/user.dto'
import { taskTransformer } from '@common/services/transformers/task.transformer'

export const getUser = (user: User): IUser =>
  plainToInstance(UserDTO, {
    ...user,
    preferences: JSON.parse(user.preferences),
    tasks: user.tasks?.map((task) => ({ ...task, weekly: JSON.parse(task.weekly), dates: JSON.parse(task.dates) }))
  })
export const getUserEntity = (user: IUser): User => ({
  ...user,
  preferences: JSON.stringify(user.preferences),
  status: String(user.status),
  tasks: user.tasks?.map(taskTransformer.toEntity)
})
