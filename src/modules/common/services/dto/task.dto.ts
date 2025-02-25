import { PriorityTransformer } from '@common/utils'
import { Transform } from 'class-transformer'
import { DayWeek, TaskBase, Priority } from '@common/types'

export class TaskDTO implements TaskBase {
  id: number

  title: string

  // @Transform(TaskTypeTransformer)
  type: string // temporary

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
