import React, { ReactNode, FC, createContext } from 'react'
import { useDBConnection } from '@common/hooks'
import { FallbackScreen } from '@common/components'

interface DBProviderProps {
  children: ReactNode
}

const Context = createContext({})

export const DBProvider: FC<DBProviderProps> = ({ children }) => {
  const { dataSource, isInitialized, isError } = useDBConnection()

  if (isError || !isInitialized) {
    return <FallbackScreen isError={isError} isLoading={!isInitialized} />
  }

  return <Context.Provider value={dataSource}>{children}</Context.Provider>
}
