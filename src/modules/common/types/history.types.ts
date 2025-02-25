import { Task } from '@common/db/entities'

import { TaskStatus } from './enums'

export interface ICreateHistoryTaskParams {
  task: Task
  status: TaskStatus
}

export interface IHistoryTask {
  id: number
  status: TaskStatus
  durationSpent: number
  breakDurationSpent: number
  createdHistoryDate: string
  createdAt: Date
  task: {
    id: number
  }
}
export interface IStatisticTask {
  taskId: number
  durationSpent: number
  breakDurationSpent: number
}
