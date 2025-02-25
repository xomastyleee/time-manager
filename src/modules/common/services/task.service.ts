import { In } from 'typeorm'
import dayjs from 'dayjs'
import { Task, User } from '@common/db/entities'
import { logger } from '@common/utils'
import { dataSource } from '@common/db/dataSource'
import { ITask, ITaskCreateParams, ITaskUpdateParams, TaskStatus } from '@common/types'
import { getUser, taskTransformer } from '@common/services/transformers'
import { historyTaskService } from '@common/services/historyTask.service'

import { DailyMode } from '../constants'

export class TaskService {
  private readonly taskRepository = dataSource.getRepository(Task)

  private readonly userRepository = dataSource.getRepository(User)

  public async createTask(params: ITaskCreateParams) {
    try {
      const task = new Task(params)
      const result = await this.taskRepository.save(task)

      await historyTaskService.createHistoryTask({
        task,
        status: TaskStatus.Planned
      })

      return result
    } catch (error) {
      logger.error('Create task error:', error)
    }
  }

  public async getUserTaskForCurrentDate({
    userId,
    dailyMode,
    currentDate
  }: {
    userId: number
    dailyMode: DailyMode
    currentDate: dayjs.Dayjs
  }): Promise<ITask[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['tasks']
    })

    const tasks = getUser(user!)?.tasks ?? []

    const filteredTasks = tasks.filter((task) => {
      if (dailyMode === DailyMode.DAY) {
        return task.dates?.some((date) => dayjs(date).isSame(currentDate, 'day'))
      }

      if (dailyMode === DailyMode.WEEK) {
        const weekStart = currentDate.startOf('week')
        const weekEnd = currentDate.endOf('week')
        return task.dates?.some((date) => dayjs(date).isBetween(weekStart, weekEnd, 'day', '[]'))
      }

      return false
    })

    const populatedTasksWithHistory = await Promise.all(
      filteredTasks.map(async (task) => {
        const history = await historyTaskService.getByIdTaskHistoryRange({
          taskId: task.id,
          date: currentDate.toDate()
        })
        const isTodayOrFuture = dayjs(currentDate).isSameOrAfter(dayjs(), 'day')

        let status = TaskStatus.Planned
        let durationSpent = 0
        let breakDurationSpent = 0

        if (history?.allHistoryByDate && history?.allHistoryByDate.length > 0) {
          const statistic = await historyTaskService.calculateWorkTime(history?.allHistoryByDate ?? [])
          status = history.lastHistoryByDate.status
          durationSpent += statistic.durationSpent
          breakDurationSpent += statistic.breakDurationSpent
        }

        if (
          !isTodayOrFuture &&
          (status === TaskStatus.InProgress || status === TaskStatus.Planned || status === TaskStatus.Paused)
        ) {
          status = TaskStatus.Failed
        }

        return { ...task, status, durationSpent, breakDurationSpent }
      })
    )

    // const sortedTasks = populatedTasksWithHistory.sort((a, b) => a.priority.localeCompare(b.priority))
    return populatedTasksWithHistory
  }

  public async createTasks(taskData: ITaskCreateParams[]) {
    try {
      const tasks = taskData.map((data) => new Task(data))
      const tasksEntities = await this.taskRepository.save(tasks)
      if (tasksEntities.length > 0) {
        await Promise.all(
          tasks.map((task) =>
            historyTaskService.createHistoryTask({
              task,
              status: TaskStatus.Planned
            })
          )
        )
      }
      const result = tasksEntities.map(taskTransformer.toInterface)

      return result
    } catch (error) {
      logger.error('Error creating tasks', error)
    }
  }

  public async getHistoryTasks(taskId: number) {
    const tasks = await this.taskRepository.findOne({
      where: { id: taskId },
      relations: ['history']
    })
    if (tasks) {
      return tasks
    }
    return null
  }

  public async getTaskById(id: number) {
    try {
      const getTask = await this.taskRepository.findOneBy({
        id
      })
      const result = taskTransformer.toInterface(getTask)
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
      const result = getTasks.map(taskTransformer.toInterface).filter((task) => task !== null)
      return result
    } catch (error) {
      logger.error('Error getting tasks', error)
    }
  }

  public async updateTask(id: number, params: ITaskUpdateParams) {
    try {
      const originalTaskEntity = await this.taskRepository.findOneBy({
        id
      })

      const transformedTask = await this.getTaskById(id)
      if (!transformedTask) return

      const taskEntity = taskTransformer.toEntity({ ...transformedTask, ...params })

      if (params.status) {
        await historyTaskService.createHistoryTask({
          task: taskEntity,
          status: params.status
        })
      }

      const result = await this.taskRepository.update(id, {
        ...originalTaskEntity,
        ...params,
        dates: params.dates ? JSON.stringify(params.dates.map((date) => date.toISOString())) : originalTaskEntity?.dates
      })
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
