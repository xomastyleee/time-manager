import { NotificationType, Priority, TaskStatus, TaskType, UserStatus } from '@common/db/types/enams'

export interface IUserCreateUpdateParams {
  status: UserStatus
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
