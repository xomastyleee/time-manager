import React, { ReactNode, FC, createContext } from 'react'
import { useDBConnection } from '@modules/common/hooks'
import { logger } from '@modules/common/utils'

interface DBProviderProps {
  children: ReactNode
}

const Context = createContext({})

export const DBProvider: FC<DBProviderProps> = ({ children }) => {
  const db = useDBConnection()

  logger.debug('debug')
  logger.info('info')
  logger.warn('warn')
  logger.error('error')

  return <Context.Provider value={db}>{children}</Context.Provider>
}
