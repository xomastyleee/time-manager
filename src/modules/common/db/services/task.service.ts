import { dataSource } from '@common/hooks'
import { logger } from '@common/utils'
import { In } from 'typeorm'
import { ITaskCreateUpdateParams } from '@common/db/types/interfaces'
import { Task } from '../entities'

export class TaskService {
  private readonly taskRepository = dataSource.getRepository(Task)

  public async createTask(params: ITaskCreateUpdateParams) {
    try {
      const task = new Task(params)
      const result = await this.taskRepository.save(task)
      logger.info('Creating task', result)
      return result
    } catch (error) {
      logger.error('Create task error:', error)
    }
  }

  public async getTaskById(id: number) {
    try {
      const result = await this.taskRepository.findOneBy({
        id
      })
      return result
    } catch (error) {
      logger.error(`Problem getting task by id: ${id}`, error)
    }
  }

  public async getTaskByIds(ids: number[]) {
    try {
      const result = await this.taskRepository.find({
        where: {
          id: In(ids)
        }
      })
      return result
    } catch (error) {
      logger.error('Error getting tasks', error)
    }
  }

  public async updateTask(id: number, params: ITaskCreateUpdateParams) {
    try {
      const result = await this.taskRepository.update(id, params)
      return result
    } catch (error) {
      logger.error('Error updating task', error)
    }
  }

  public async removeTaskById(id: number) {
    try {
      const task = await this.taskRepository.findOne({ where: { id } })
      if (!task) {
        logger.error('Error:', new Error('task not found'))
        return
      }
      const result = await this.taskRepository.remove(task)
      logger.info('Deleting task', result)
    } catch (error) {
      logger.error(`Error remove task by id: ${id}`, error)
    }
  }
}
export const taskService = new TaskService()
