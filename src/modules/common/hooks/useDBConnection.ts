import { useEffect } from 'react'
import { DataSource } from 'typeorm'
import { DayPlan, Goal, User, Notification, Task } from '@common/db/entities'
import { logger } from '@common/utils'

export const dataSource = new DataSource({
  type: 'react-native',
  database: 'test',
  location: 'default',
  logging: ['error', 'query', 'schema'],
  entities: [User, DayPlan, Goal, Notification, Task],
  synchronize: true
})

export const useDBConnection = () => {
  useEffect(() => {
    dataSource
      .initialize()
      .then(() => {
        logger.info('DataSource has been initialized!')
      })
      .catch((err) => {
        logger.error('Error during DataSource initialization:', err)
      })
  }, [])

  return dataSource
}
