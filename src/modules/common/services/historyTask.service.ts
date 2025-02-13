import { logger } from '@common/utils'
import { dataSource } from '@common/db/dataSource'
import { HistoryTask } from '@common/db/entities/HistoryTask'
import { ICreateHistoryTaskParams } from '@common/types'

export class HistoryTaskServiceService {
  private readonly historyRepository = dataSource.getRepository(HistoryTask)

  public async createHistoryTask(params: ICreateHistoryTaskParams) {
    try {
      const history = new HistoryTask(params)

      const result = await this.historyRepository.save(history)
      logger.info('Create History Task:', result)
      return result
    } catch (error) {
      logger.error('Create History Task Error:', error)
    }
  }
}

export const historyTaskService = new HistoryTaskServiceService()
