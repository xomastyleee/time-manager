import { logger } from '@common/utils'
import { dataSource } from '@common/db/dataSource'
import { HistoryTask } from '@common/db/entities/HistoryTask.entity'
import { ICreateHistoryTaskParams, IHistoryTask, IStatisticTask, TaskStatus } from '@common/types'
import { Between, FindManyOptions } from 'typeorm'
import dayjs from 'dayjs'

export class HistoryTaskServiceService {
  private readonly historyRepository = dataSource.getRepository(HistoryTask)

  private getRangeDate = (date: Date) => Between(dayjs(date).startOf('day').toDate(), dayjs(date).endOf('day').toDate())

  public async createHistoryTask(params: ICreateHistoryTaskParams) {
    try {
      if (params?.task) {
        const history = new HistoryTask(params)

        const result = await this.historyRepository.save(history)
        logger.info('Create History Task:', result)
        return result
      }
      logger.info('Create History Task Failed params:', params)
      return null
    } catch (error) {
      logger.error('Create History Task Error:', error)
    }
  }

  public async getHistoryTasksById(taskId: number) {
    const History = await this.historyRepository
      .createQueryBuilder('historyTask')
      .leftJoin('historyTask.task', 'task')
      .where('task.id = :taskId', { taskId })
      .select(['historyTask.id', 'historyTask.statusTask', 'historyTask.createdAt', 'task.id'])
      .getMany()

    return History
  }

  public async getByIdTaskHistoryRange(params: { taskId: number; date: Date; isLast: boolean }) {
    try {
      const queryOptions: FindManyOptions<HistoryTask> = {
        where: {
          task: { id: params.taskId },
          createdAt: this.getRangeDate(params.date)
        },
        order: { createdAt: 'DESC' }
      }

      if (params.isLast) {
        queryOptions.take = 1
      }

      const History = await this.historyRepository.find(queryOptions)
      return History
    } catch (error) {
      logger.error('Get Task History Error:', error)
    }
  }

  public async calculateWorkTask(historyTasks: IHistoryTask[]): Promise<IStatisticTask> {
    const historys = historyTasks.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())

    const result = historys.reduce(
      (acc, history, index) => {
        if (index > 0) {
          const duration = history.createdAt.getTime() - historys[index - 1].createdAt.getTime()
          if (acc.currentStatus === TaskStatus.Planned) {
            acc.pausedTime += duration
          } else if (acc.currentStatus === TaskStatus.InProgress) {
            acc.workingTime += duration
          }
        }

        acc.currentStatus = history.status
        acc.lastStatusChange = history.createdAt

        return acc
      },
      {
        pausedTime: 0,
        workingTime: 0,
        currentStatus: null as TaskStatus | null,
        lastStatusChange: null as Date | null
      }
    )

    return {
      taskId: historyTasks[0].id,
      pauseTime: result.pausedTime,
      workTime: result.workingTime,
      isClosed: [TaskStatus.CompletedSuccessfully, TaskStatus.CompletedUnsuccessfully].includes(
        historys[historys.length - 1].status
      )
    }
  }
}

export const historyTaskService = new HistoryTaskServiceService()
