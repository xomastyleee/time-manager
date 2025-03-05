import { DayWeekMap, TaskStatus } from './enums'
import { ITask, IUser, TaskBase } from './main.types'

export interface ITaskCreateParams extends TaskBase {
  user: IUser
}

export interface ITaskCreateParamsToEntity extends TaskBase {
  id: number
  user: IUser
}

export interface ITaskUpdateParams extends Partial<TaskBase> {
  id: number
  user: IUser
  status?: TaskStatus
}

export type ITasksByWeeks = Record<keyof typeof DayWeekMap, ITask[]>
