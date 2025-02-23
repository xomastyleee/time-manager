import { IUser } from './data-interfaces'
import { Priority, TaskStatus } from './enums'

interface TaskBase {
  title: string
  type: ITaskType
  dates: Date[]
  duration: number
  breakDuration: number
  description?: string
}

export interface ITaskType {
  // This interface is should be new entity, connected to goals and managed by user
  id: number
  title: string
  description: string
  priority: Priority
  // goal: IGoal
  user: IUser
}

export interface ITaskCreateParams extends TaskBase {
  user: IUser
}

export interface ITaskUpdateParams extends TaskBase {
  id: number
  user: IUser
  status: TaskStatus
}

export interface ITask extends TaskBase {
  id: number
  priority: Priority
  status: TaskStatus
  durationSpent: number
  breakDurationSpent: number
}
