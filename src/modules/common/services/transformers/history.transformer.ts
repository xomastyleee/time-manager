import { BaseTransformer, IHistoryTask, TaskStatus } from '@common/types'
import { HistoryTask, Task } from '@common/db/entities'

class HistoryTaskTransformer extends BaseTransformer<HistoryTask, IHistoryTask> {
  toEntity(dto: IHistoryTask): HistoryTask {
    return {
      id: dto.id,
      statusTask: dto.status,
      createdAt: dto.createdAt,
      task: dto.task as Task
    }
  }

  toInterface(entity: HistoryTask): IHistoryTask {
    return {
      id: entity.id,
      status: entity.statusTask as TaskStatus,
      createdAt: entity.createdAt,
      task: { id: entity.task.id }
    }
  }
}
export const historyTransformer = new HistoryTaskTransformer()
