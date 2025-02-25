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
                history.durationSpent = dayjs().valueOf() - dayjs(lastHistory.createdHistoryDate).valueOf()
              }
              break
            case TaskStatus.Paused:
              if ([TaskStatus.InProgress, TaskStatus.Failed, TaskStatus.Completed].includes(currentStatus)) {
                history.breakDurationSpent = dayjs().valueOf() - dayjs(lastHistory.createdHistoryDate).valueOf()
              }
              break
            default:
              history.durationSpent = 0
              history.breakDurationSpent = 0
              break
          }
        }
        const result = await this.historyRepository.save(history)
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

  public async calculateWorkTime(historyTasks: IHistoryTask[]): Promise<IStatisticTask> {
    const result = historyTasks.reduce(
      (acc, history) => {
        acc.durationSpent += history.durationSpent
        acc.breakDurationSpent += history.breakDurationSpent
        return acc
      },
      {
        durationSpent: 0,
        breakDurationSpent: 0
      }
    )

    return {
      taskId: historyTasks[0].id,
      durationSpent: result.durationSpent,
      breakDurationSpent: result.breakDurationSpent
    }
  }
}

export const historyTaskService = new HistoryTaskServiceService()
