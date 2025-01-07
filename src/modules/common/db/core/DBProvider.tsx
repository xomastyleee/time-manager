import React, { ReactNode, FC, createContext } from 'react'
import { useDBConnection } from '@common/hooks'
import { FallbackScreen } from '@common/components'

interface DBProviderProps {
  children: ReactNode
}

const Context = createContext({})

export const DBProvider: FC<DBProviderProps> = ({ children }) => {
  const { dataSource, isInitialized, error } = useDBConnection()

  if (error || !isInitialized) {
    return <FallbackScreen error={error} isLoading={!isInitialized} />
  }

  return <Context.Provider value={dataSource}>{children}</Context.Provider>
}
