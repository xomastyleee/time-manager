import { Task } from '@common/db/entities'
import { DayWeek, DayWeekMap, NotificationType, Priority, TaskStatus, TaskType, UserStatus } from '@common/types'

export interface IUser {
  id: number
  username?: string
  preferences: IPreferences
  tasks?: ITask[]
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
  weekly?: number[]
  dates?: Date[]
  description?: string
  duration?: number
  breakDuration?: number
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

export interface ITaskWithStatus extends ITask {
  status: TaskStatus
}

export interface ICreateHistoryTaskParams {
  task: Task
  status?: TaskStatus
  duration?: number
  breakDuration?: number
}
export interface IHistoryTask {
  id: number
  status: TaskStatus
  createdAt: Date
  task: {
    id: number
  }
}
export interface IStatisticTask {
  taskId: number
  workTime: number
  pauseTime: number
  isClosed: boolean
}

export type ITasksByWeeks = Record<keyof typeof DayWeekMap, ITask[]>
export type WeekDayCodes = 0 | 1 | 2 | 3 | 4 | 5 | 6
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
  status?: TaskStatus
  priority?: Priority
  type?: TaskType
  weekly?: DayWeek[] | undefined
  dates?: Date[] | undefined
  description?: string
  duration?: number
  breakDuration?: number
  user?: IUser
}

export interface INotificationCreateUpdateParams {
  type: NotificationType
  message: string
  isRead?: boolean
}
