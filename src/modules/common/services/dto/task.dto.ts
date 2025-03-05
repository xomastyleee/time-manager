import { Transform } from 'class-transformer'
import { PriorityTransformer } from '@common/utils'

import type { DayWeek, TaskBase, Priority, ITaskType } from '@common/types'
import { taskTypeTransformer } from '../transformers/taskType.transformer'

export class TaskDTO implements TaskBase {
  id: number

  title: string

  @Transform(({ value }) => taskTypeTransformer.toInterface(value))
  type: ITaskType

  @Transform(PriorityTransformer)
  priority: Priority

  @Transform(({ value }) => (value ? JSON.parse(value) : []))
  weekly?: DayWeek[]

  @Transform(({ value }) => (value ? JSON.parse(value).map((date: string) => new Date(date)) : []))
  dates: Date[]

  description?: string

  duration: number

  breakDuration: number
}
