import {
  BaseTransformer,
  DayWeek,
  ITask,
  ITaskCreateUpdateParams,
  Priority,
  PublicTaskData,
  TaskType
} from '@common/types'
import { Task } from '@common/db/entities'

class TaskTransformer extends BaseTransformer<Task, ITask | ITaskCreateUpdateParams> {
  toInterface(entity: Task | null): ITask | null {
    if (entity) {
      return {
        id: entity.id,
        title: entity.title,
        priority: entity.priority as Priority,
        type: entity.type as TaskType,
        weekly: entity.weekly ? (JSON.parse(entity.weekly) as DayWeek[]) : undefined,
        dates: entity.dates ? JSON.parse(entity.dates).map((date: string) => new Date(date)) : undefined,
        description: entity.description,
        duration: entity.duration,
        breakDuration: entity.breakDuration
      }
    }
    return null
  }

  toEntity(dto: ITask | ITaskCreateUpdateParams): Task {
    return new Task({
      title: dto.title,
      priority: dto.priority,
      type: dto.type,
      weekly: dto.weekly,
      dates: dto.dates,
      description: dto.description,
      duration: dto.duration,
      breakDuration: dto.breakDuration
    })
  }

  toUpdateEntity(dto: ITaskCreateUpdateParams | null): PublicTaskData | null {
    if (dto) {
      const entity = new Task({
        title: dto.title,
        priority: dto.priority,
        type: dto.type,
        weekly: dto.weekly,
        dates: dto.dates,
        description: dto.description,
        duration: dto.duration,
        status: dto.status,
        breakDuration: dto.breakDuration
      })
      return entity
    }
    return null
  }
}
export const taskTransformer = new TaskTransformer()
