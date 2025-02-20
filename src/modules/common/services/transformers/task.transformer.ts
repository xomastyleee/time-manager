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
    const task = new Task({
      title: dto.title,
      priority: dto.priority,
      type: dto.type,
      weekly: dto.weekly,
      dates: dto.dates,
      description: dto.description,
      duration: dto.duration,
      breakDuration: dto.breakDuration
    })
    if (dto.id) task.id = dto.id
    return task
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
      if (dto.id) entity.id = dto.id
      return entity
    }
    return null
  }
}
export const taskTransformer = new TaskTransformer()
