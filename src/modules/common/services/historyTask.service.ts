import { logger } from '@common/utils'
import { dataSource } from '@common/db/dataSource'
import { HistoryTask } from '@common/db/entities/HistoryTask.entity'
import { ICreateHistoryTaskParams, IHistoryTask, IStatisticTask, TaskStatus } from '@common/types'
import { Between } from 'typeorm'
import dayjs from 'dayjs'
import { historyTransformer } from '@common/services/transformers'

export class HistoryTaskServiceService {
  private readonly historyRepository = dataSource.getRepository(HistoryTask)

  private getRangeDate = (date: Date) => Between(dayjs(date).startOf('day').toDate(), dayjs(date).endOf('day').toDate())

  public async createHistoryTask(params: ICreateHistoryTaskParams) {
    try {
      if (params?.task) {
        const history = new HistoryTask(params)
        history.task = params.task
        const result = await this.historyRepository.save(history)
        logger.info('Create HistoryTask Result:', result)
        return result
      }
      return null
    } catch (error) {
      logger.error('Create History Task Error:', error)
    }
  }

  public async getHistoryTasksById(taskId: number) {
    const query = this.historyRepository
      .createQueryBuilder('historyTask')
      .leftJoin('historyTask.task', 'task')
      .where('task.id = :taskId', { taskId })
      .select(['historyTask.id', 'historyTask.statusTask', 'historyTask.createdAt', 'task.id'])

    const QuerySQL = query.getQuery()
    logger.info('GetHistory :', QuerySQL)
    const result = await query.getMany()
    return result.map(historyTransformer.toInterface)
  }

  public async getByIdTaskHistoryRange(params: { taskId: number; date: Date }) {
    try {
      const queryBuilder = this.historyRepository
        .createQueryBuilder('historyTask')
        .leftJoin('historyTask.task', 'task')
        .where('task.id = :taskId', { taskId: params.taskId })
        .andWhere('historyTask.createdAt >= :startDate AND historyTask.createdAt <= :endDate', {
          startDate: dayjs(params.date).startOf('day').toDate(),
          endDate: dayjs(params.date).endOf('day').toDate()
        })
        .select(['historyTask.id', 'historyTask.statusTask', 'historyTask.createdAt', 'task.id'])
        .orderBy('historyTask.createdAt', 'DESC')
        .addOrderBy('historyTask.createdAt', 'DESC')

      const allHistory = await queryBuilder.getMany()

      queryBuilder.take(1)

      const lastHistory = await queryBuilder.getMany()

      return {
        allHistoryByDate: allHistory.map(historyTransformer.toInterface),
        lastHistoryByDate: lastHistory.map(historyTransformer.toInterface)[0]
      }
    } catch (error) {
      logger.error('Get Task History Error:', error)
    }
  }

  public async calculateWorkTask(historyTasks: IHistoryTask[]): Promise<IStatisticTask> {
    if (historyTasks.length <= 1) {
      return {
        taskId: historyTasks[0].id,
        pauseTime: 0,
        workTime: 0,
        isClosed: false
      }
    }
    const historyArray = historyTasks.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())

    const result = historyArray.reduce(
      (acc, history, index) => {
        if (index > 0) {
          const duration = new Date(history.createdAt).getTime() - new Date(historyArray[index - 1].createdAt).getTime()
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
      isClosed: [TaskStatus.Failed, TaskStatus.Completed].includes(historyArray[historyArray.length - 1].status)
    }
  }
}

export const historyTaskService = new HistoryTaskServiceService()
