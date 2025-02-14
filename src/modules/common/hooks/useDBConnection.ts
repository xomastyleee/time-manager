import { useCallback, useEffect, useState } from 'react'
import { createAllMockData, logger } from '@common/utils'
import { dataSource } from '@common/db/dataSource'

export const useDBConnection = () => {
  const [isInitialized, setIsInitialized] = useState(false)
  const [isError, setIsError] = useState(false)

  const initializeDB = useCallback(async () => {
    try {
      if (!isInitialized) {
        logger.info('Initializing database...')
        await dataSource.initialize()
        logger.info('Run migrations...')
        await dataSource.runMigrations()
        // Dev mod call mock create data.
        logger.info('Create mock data...')
        await createAllMockData()
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
