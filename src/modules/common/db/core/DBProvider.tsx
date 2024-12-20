import React, { ReactNode, FC, createContext } from 'react'
import { useDBConnection } from '@common/hooks'

interface DBProviderProps {
  children: ReactNode
}

const Context = createContext({})

export const DBProvider: FC<DBProviderProps> = ({ children }) => {
  const db = useDBConnection()

  return <Context.Provider value={db}>{children}</Context.Provider>
}
