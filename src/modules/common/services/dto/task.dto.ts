import { PriorityTransformer, TaskTypeTransformer } from '@common/utils'
import { Transform } from 'class-transformer'
import { DayWeek, ITask, Priority, TaskType } from '@common/types'

export class TaskDTO implements ITask {
  id: number

  title: string

  @Transform(TaskTypeTransformer)
  type: TaskType

  @Transform(PriorityTransformer)
  priority: Priority

  @Transform(({ value }) => (value ? JSON.parse(value) : []))
  weekly?: DayWeek[]

  @Transform(({ value }) => (value ? JSON.parse(value).map((date: string) => new Date(date)) : []))
  dates?: Date[]

  description?: string

  duration?: number

  breakDuration?: number
}
