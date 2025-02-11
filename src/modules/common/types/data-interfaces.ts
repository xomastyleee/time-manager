import { Task } from '@common/db/entities'

import { DayWeek, NotificationType, Priority, TaskStatus, TaskType, UserStatus } from './enams'

export interface IUser {
  id: number
  username?: string
  preferences: IPreferences
  status: UserStatus
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}
export interface ITask {
  id: number
  title: string
  priority: Priority
  type: TaskType
  weekly?: DayWeek[]
  dates?: Date[]
  status: TaskStatus
  startDate: Date
  endDate?: Date
  description?: string
  duration?: number
  breakDuration?: number
}

export type PublicTaskData = Omit<Task, 'id'>

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
  backgroundPath?: string | null
  isDark?: boolean
  lang?: string
  useSystemLang?: boolean
}

export interface ITaskUpdateParams {
  title?: string
  priority?: Priority
  type?: TaskType
  weekly?: DayWeek[]
  dates?: Date[]
  status?: TaskStatus
  startDate?: Date
  endDate?: Date
  description?: string
  duration?: number
  breakDuration?: number
}

export interface ITaskCreateParams {
  title: string
  priority: Priority
  type: TaskType
  weekly: DayWeek[]
  dates: Date[]
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
