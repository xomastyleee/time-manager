import React, { ReactNode, FC, createContext } from 'react'
import { useDBConnection } from '@common/hooks'
import { logger } from '@common/utils'
import { ActivityIndicator, Text, View } from 'react-native'

interface DBProviderProps {
  children: ReactNode
}

const Context = createContext({})

export const DBProvider: FC<DBProviderProps> = ({ children }) => {
  const { dataSource, isInitialized } = useDBConnection()

  if (!isInitialized) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  return <Context.Provider value={dataSource}>{children}</Context.Provider>
}
