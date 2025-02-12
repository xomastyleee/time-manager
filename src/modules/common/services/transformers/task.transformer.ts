import { DayWeek, ITask, ITaskCreateUpdateParams, Priority, PublicTaskData, TaskStatus, TaskType } from '@common/types'
import { Task } from '@common/db/entities'

export class TaskTransformer {
  static toInterface(entity: Task | null): ITask | null {
    if (entity) {
      return {
        id: entity.id,
        title: entity.title,
        priority: entity.priority as Priority,
        type: entity.type as TaskType,
        weekly: entity.weekly ? (JSON.parse(entity.weekly) as DayWeek[]) : undefined,
        dates: entity.dates ? JSON.parse(entity.dates).map((date: string) => new Date(date)) : undefined,
        status: entity.status as TaskStatus,
        startDate: new Date(entity.startDate),
        endDate: entity.endDate ? new Date(entity.endDate) : undefined,
        description: entity.description,
        duration: entity.duration,
        breakDuration: entity.breakDuration
      }
    }
    return null
  }

  static toEntity(dto: ITask | ITaskCreateUpdateParams | null): Task | null {
    if (dto) {
      return new Task({
        title: dto.title,
        priority: dto.priority,
        type: dto.type,
        weekly: dto.weekly,
        dates: dto.dates,
        status: dto.status,
        startDate: dto.startDate,
        endDate: dto.endDate,
        description: dto.description,
        duration: dto.duration,
        breakDuration: dto.breakDuration
      })
    }
    return null
  }

  static toUpdateEntity(dto: ITaskCreateUpdateParams | null): PublicTaskData | null {
    if (dto) {
      const entity = new Task({
        title: dto.title,
        priority: dto.priority,
        type: dto.type,
        weekly: dto.weekly,
        dates: dto.dates,
        status: dto.status || TaskStatus.Pending,
        startDate: dto.startDate,
        endDate: dto.endDate,
        description: dto.description,
        duration: dto.duration,
        breakDuration: dto.breakDuration
      })
      return entity
    }
    return null
  }
}
