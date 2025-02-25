import {
  BaseTransformer,
  ITransformedTask,
  ITaskCreateParamsToEntity,
  ITaskUpdateParams,
  TaskBase
} from '@common/types'
import { Task } from '@common/db/entities'

class TaskTransformer extends BaseTransformer<Task, ITransformedTask | TaskBase | ITaskUpdateParams> {
  toInterface(entity: Task | null): ITransformedTask | null {
    if (entity) {
      return {
        id: entity.id,
        title: entity.title,
        type: entity.type,
        dates: entity.dates ? JSON.parse(entity.dates).map((date: string) => new Date(date)) : undefined,
        description: entity.description,
        duration: entity.duration,
        breakDuration: entity.breakDuration
      }
    }
    return null
  }

  toEntity(dto: ITaskCreateParamsToEntity): Task {
    const task = new Task({
      user: dto.user,
      title: dto.title,
      type: dto.type,
      dates: dto.dates,
      description: dto.description,
      duration: dto.duration,
      breakDuration: dto.breakDuration
    })
    if (dto.id) task.id = dto.id
    return task
  }

  toUpdateEntity(dto: ITaskCreateParamsToEntity | null): Task | null {
    if (dto) {
      const entity = new Task({
        user: dto.user,
        title: dto.title,
        type: dto.type,
        dates: dto.dates,
        description: dto.description,
        duration: dto.duration,
        breakDuration: dto.breakDuration
      })
      if (dto.id) entity.id = dto.id
      return entity
    }
    return null
  }
}
export const taskTransformer = new TaskTransformer()
