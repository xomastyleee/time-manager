import { User } from '@common/db/entities'

import { NotificationType, Priority, TaskStatus, TaskType, UserStatus } from './enams'

export interface IUserCreateUpdateParams {
  status?: UserStatus
  username?: string
  preferences?: string
}

export interface ITaskCreateUpdateParams {
  title: string
  priority: Priority
  taskType: TaskType
  status: TaskStatus
  startDate: Date
  endDate: Date
  description?: string
  duration?: number
  breakDuration?: number
}

export interface INotificationCreateUpdateParams {
  type: NotificationType
  message: string
  isRead?: boolean
}

export interface UserState {
  user: User | null
  userList: User[]
  isLoading: boolean
}
