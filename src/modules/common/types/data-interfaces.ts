import { NotificationType, Priority, TaskStatus, TaskType, UserStatus } from './enams'

export interface IUserCreateParams {
  status?: UserStatus
  username?: string
  preferences: IPreferences
}

export interface IUserUpdateParams {
  status?: UserStatus
  username?: string
  preferences?: IPreferences
}

export interface IPreferences {
  theme?: string
  backgroundPath?: string
  isDark?: boolean
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
