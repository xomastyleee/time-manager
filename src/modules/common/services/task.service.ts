import { In } from 'typeorm'
import { Task } from '@common/db/entities'
import { logger } from '@common/utils'
import { dataSource } from '@common/db/dataSource'
import { ITask, ITaskCreateUpdateParams } from '@common/types'
import { TaskTransformer } from '@common/services/transformers'

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

  public async getAllTasks(): Promise<(ITask | null)[]> {
    const tasks = await this.taskRepository.find()
    const result = tasks.map(TaskTransformer.toInterface)
    return result
  }

  public async createTasks(taskData: ITaskCreateUpdateParams[]) {
    try {
      const tasks = taskData.map((data) => new Task(data))
      const tasksEntities = await this.taskRepository.save(tasks)
      const result = tasksEntities.map(TaskTransformer.toInterface)
      logger.info('Creating tasks:', result)

      return tasksEntities
    } catch (error) {
      logger.error('Error creating tasks', error)
    }
  }

  public async getTaskById(id: number) {
    try {
      const getTask = await this.taskRepository.findOneBy({
        id
      })
      const result = TaskTransformer.toInterface(getTask)
      return result
    } catch (error) {
      logger.error(`Problem getting task by id: ${id}`, error)
    }
  }

  public async getTaskByIds(ids: number[]) {
    try {
      const getTasks = await this.taskRepository.find({
        where: {
          id: In(ids)
        }
      })
      const result = getTasks.map(TaskTransformer.toInterface).filter((task) => task !== null)
      return result
    } catch (error) {
      logger.error('Error getting tasks', error)
    }
  }

  public async updateTask(id: number, params: ITaskCreateUpdateParams) {
    try {
      const updatedParams = TaskTransformer.toUpdateEntity(params)
      if (updatedParams) {
        const result = await this.taskRepository.update(id, updatedParams)
        logger.info('Updated task', result.raw)
        return result
      }
      return null
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
