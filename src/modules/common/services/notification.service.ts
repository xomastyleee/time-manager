import { In } from 'typeorm'
import { Notification } from '@common/db/entities'
import { logger } from '@common/utils'
import { dataSource } from '@common/db/dataSource'

import type { INotificationCreateUpdateParams } from '@common/types'

export class NotificationService {
  private readonly notificationRepository = dataSource.getRepository(Notification)

  public async createNotification(params: INotificationCreateUpdateParams) {
    try {
      const notification = new Notification(params)
      const result = await this.notificationRepository.save(notification)
      logger.info('Creating notification', result)
      return result
    } catch (error) {
      logger.error('Create task error:', error)
    }
  }

  public async getNotificationById(id: number) {
    try {
      const result = await this.notificationRepository.findOneBy({
        id
      })
      return result
    } catch (error) {
      logger.error(`Problem getting notification by id: ${id}`, error)
    }
  }

  public async getNotificationByIds(ids: number[]) {
    try {
      const result = await this.notificationRepository.find({
        where: {
          id: In(ids)
        }
      })
      return result
    } catch (error) {
      logger.error('Error getting notification', error)
    }
  }

  public async updateTask(id: number, params: INotificationCreateUpdateParams) {
    try {
      const result = await this.notificationRepository.update(id, params)
      return result
    } catch (error) {
      logger.error('Error updating notification', error)
    }
  }

  public async removeTaskById(id: number) {
    try {
      const notification = await this.notificationRepository.findOne({ where: { id } })
      if (!notification) {
        logger.error('Error:', new Error('notification not found'))
        return
      }
      const result = await this.notificationRepository.remove(notification)
      logger.info('Deleting notification', result)
    } catch (error) {
      logger.error(`Error remove notification by id: ${id}`, error)
    }
  }
}
export const notificationService = new NotificationService()
