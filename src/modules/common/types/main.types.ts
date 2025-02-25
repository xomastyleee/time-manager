import { Priority, TaskStatus, UserStatus } from './enums'

export interface TaskBase {
  title: string
  type: string // temporary
  dates: Date[]
  duration: number
  breakDuration: number
  description?: string
}

export interface ITransformedTask extends TaskBase {
  id: number
}

export interface ITask extends ITransformedTask {
  priority: Priority
  status: TaskStatus
  durationSpent: number
  breakDurationSpent: number
}

export interface IPreferences {
  theme?: string
  backgroundPath?: string | null
  isDark?: boolean
  lang?: string
  useSystemLang?: boolean
}

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

export type WeekDayCodes = 0 | 1 | 2 | 3 | 4 | 5 | 6
