import { TaskType } from '@common/db/entities'
import { dataSource } from '@common/db/dataSource'
import { logger } from '@common/utils'
import { ITaskType } from '@common/types'

import { taskTypeTransformer } from './transformers/taskType.transformer'

export class TaskTypeService {
  private readonly taskTypeRepository = dataSource.getRepository(TaskType)

  public async createTaskType(params: ITaskType) {
    try {
      const taskType = new TaskType({
        ...params
      })

      const result = await this.taskTypeRepository.save(taskType)
      return taskTypeTransformer.toInterface(result)
    } catch (error) {
      logger.error('Create task type error:', error)
      return null
    }
  }

  public async getTaskTypesByUserId(userId: number) {
    try {
      const taskTypes = await this.taskTypeRepository.find({
        where: { user: { id: userId } },
        relations: ['user']
      })
      return taskTypes.map(taskTypeTransformer.toInterface)
    } catch (error) {
      logger.error(`Error getting task types for user ${userId}:`, error)
      return []
    }
  }

  public async getTaskTypeById(id: number) {
    try {
      const taskType = await this.taskTypeRepository.findOne({
        where: { id },
        relations: ['user']
      })
      return taskType ? taskTypeTransformer.toInterface(taskType) : null
    } catch (error) {
      logger.error(`Error getting task type ${id}:`, error)
      return null
    }
  }

  public async updateTaskType(id: number, params: ITaskType) {
    try {
      const taskType = await this.taskTypeRepository.findOneBy({ id })
      if (!taskType) return null

      const updateData = new TaskType({
        ...taskType,
        ...params
      })

      const result = await this.taskTypeRepository.save(updateData)
      return taskTypeTransformer.toInterface(result)
    } catch (error) {
      logger.error(`Error updating task type ${id}:`, error)
      return null
    }
  }

  public async removeTaskType(id: number) {
    try {
      const taskType = await this.taskTypeRepository.findOne({
        where: { id },
        relations: ['tasks']
      })

      if (!taskType) {
        logger.error('Task type not found:', id)
        return false
      }

      if (taskType.tasks && taskType.tasks.length > 0) {
        logger.error('Cannot delete task type with associated tasks:', id)
        return false
      }

      await this.taskTypeRepository.remove(taskType)
      return true
    } catch (error) {
      logger.error(`Error removing task type ${id}:`, error)
      return false
    }
  }
}

export const taskTypeService = new TaskTypeService()
