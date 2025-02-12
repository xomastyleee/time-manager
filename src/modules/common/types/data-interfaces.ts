import { Task } from '@common/db/entities'

import { DayWeek, NotificationType, Priority, TaskStatus, TaskType, UserStatus } from './enams'

export interface IUser {
  id: number
  username?: string
  preferences: IPreferences
  tasks?: Task[]
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
  tasks?: Task[]
}

export interface IUserUpdateParams {
  status?: UserStatus
  username?: string
  preferences?: IPreferences
  tasks?: Task[]
}

export interface IPreferences {
  theme?: string
  backgroundPath?: string | null
  isDark?: boolean
  lang?: string
  useSystemLang?: boolean
}

export interface ITaskCreateUpdateParams {
  title?: string
  priority?: Priority
  type?: TaskType
  weekly?: DayWeek[] | undefined
  dates?: Date[] | undefined
  status?: TaskStatus
  startDate?: Date
  endDate?: Date | undefined
  description?: string
  duration?: number
  breakDuration?: number
  users?: IUser[]
}

export interface INotificationCreateUpdateParams {
  type: NotificationType
  message: string
  isRead?: boolean
}
