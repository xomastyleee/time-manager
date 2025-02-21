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
        const currentStatus = params.status
        const history = new HistoryTask(params)
        history.task = params.task
        const lastHistory = await this.getLastHistoryTask(params.task.id)
        if (lastHistory) {
          switch (lastHistory.statusTask) {
            case TaskStatus.InProgress:
              if (
                [TaskStatus.Paused, TaskStatus.Planned, TaskStatus.Completed, TaskStatus.Failed].includes(currentStatus)
              ) {
                history.workTime = dayjs().valueOf() - dayjs(lastHistory.createdHistoryDate).valueOf()
              }
              break
            case TaskStatus.Paused:
              if ([TaskStatus.InProgress, TaskStatus.Failed, TaskStatus.Completed].includes(currentStatus)) {
                history.pauseTime = dayjs().valueOf() - dayjs(lastHistory.createdHistoryDate).valueOf()
              }
              break
            default:
              history.pauseTime = 0
              history.workTime = 0
              break
          }
        }
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

  public async getLastHistoryTask(taskId: number): Promise<HistoryTask | null> {
    const result = await this.historyRepository.findOne({
      where: { task: { id: taskId } },
      order: { createdAt: 'DESC' }
    })
    return result
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
        .select([
          'historyTask.id',
          'historyTask.statusTask',
          'historyTask.createdAt',
          'historyTask.workTime',
          'historyTask.pauseTime',
          'task.id'
        ])
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
    const result = historyTasks.reduce(
      (acc, history) => {
        acc.workingTime += history.workTime
        acc.pausedTime += history.pauseTime
        return acc
      },
      {
        pausedTime: 0,
        workingTime: 0
      }
    )

    return {
      taskId: historyTasks[0].id,
      pauseTime: result.pausedTime,
      workTime: result.workingTime,
      isClosed: [TaskStatus.Failed, TaskStatus.Completed].includes(historyTasks[historyTasks.length - 1].status)
    }
  }
}

export const historyTaskService = new HistoryTaskServiceService()
