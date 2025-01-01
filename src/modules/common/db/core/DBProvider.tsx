import React, { ReactNode, FC, createContext } from 'react'
import { useDBConnection } from '@common/hooks'
import { ActivityIndicator, Text, View } from 'react-native'

import { baseStyles } from './DBProvider.styles'

interface DBProviderProps {
  children: ReactNode
}

const Context = createContext({})

export const DBProvider: FC<DBProviderProps> = ({ children }) => {
  const { dataSource, isInitialized, error } = useDBConnection()
  const styles = baseStyles()

  if (error) {
    return (
      <View style={styles.main}>
        <Text style={styles.label}>The service is temporarily unavailable. Please try again later.</Text>
      </View>
    )
  }

  if (!isInitialized) {
    return (
      <View style={styles.main}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  return <Context.Provider value={dataSource}>{children}</Context.Provider>
}
