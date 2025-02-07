import { useCallback, useEffect, useState } from 'react'
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
  const [isInitialized, setIsInitialized] = useState(false)
  const [isError, setIsError] = useState(false)

  const initializeDB = useCallback(async () => {
    try {
      if (!isInitialized) {
        logger.info('Initializing database...')
        await dataSource.initialize()
      }
      logger.info('DataSource has been initialized!')
      setIsInitialized(true)
    } catch (err) {
      logger.error('Error during DataSource initialization:', err)
      setIsError(true)
    }
  }, [isInitialized])

  useEffect(() => {
    initializeDB()
    // We need to call this method only once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { dataSource, isInitialized, isError }
}
