import { BaseTransformer, ITaskType } from '@common/types'
import { TaskType } from '@common/db/entities'

import { getUser } from './user.transformer'

export const getTaskTypeEntity = (taskType: ITaskType): TaskType =>
  new TaskType({
    id: taskType.id,
    title: taskType.title,
    description: taskType.description,
    priority: taskType.priority,
    user: taskType.user
  })

class TaskTypeTransformer extends BaseTransformer<TaskType, ITaskType> {
  toInterface(entity: TaskType): ITaskType {
    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      priority: entity.priority,
      user: getUser(entity.user)
    }
  }

  toEntity(dto: ITaskType): TaskType {
    return new TaskType({
      id: dto.id,
      title: dto.title,
      description: dto.description,
      priority: dto.priority,
      user: dto.user
    })
  }

  toUpdateEntity(dto: ITaskType | null): TaskType | null {
    if (dto) {
      return new TaskType({
        id: dto.id,
        title: dto.title,
        description: dto.description,
        priority: dto.priority,
        user: dto.user
      })
    }
    return null
  }
}

export const taskTypeTransformer = new TaskTypeTransformer()
