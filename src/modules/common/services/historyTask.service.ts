import { logger } from '@common/utils'
import { dataSource } from '@common/db/dataSource'
import { HistoryTask } from '@common/db/entities/HistoryTask.entity'
import { ICreateHistoryTaskParams } from '@common/types'
import { Between, FindManyOptions } from 'typeorm'

export class HistoryTaskServiceService {
  private readonly historyRepository = dataSource.getRepository(HistoryTask)

  private createDateRange = (date: Date): { startDate: Date; endDate: Date } => {
    const startDate = new Date(date)
    startDate.setHours(0, 0, 0, 0)
    const endDate = new Date(date)
    endDate.setHours(23, 59, 59, 999)
    return { startDate, endDate }
  }

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

  public async getByIdTaskHistoryAll(params: { taskId: number; date: Date; isLast: boolean }) {
    try {
      const DateRange = this.createDateRange(params.date)

      const queryOptions: FindManyOptions<HistoryTask> = {
        where: {
          task: { id: params.taskId },
          createdAt: Between(DateRange.startDate, DateRange.endDate)
        },
        relations: ['task'],
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
}

export const historyTaskService = new HistoryTaskServiceService()
