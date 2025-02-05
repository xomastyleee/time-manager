import React from 'react'
import { PaperProvider } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { DBProvider } from '@common/db/core'
import { useDefinedTheme } from '@common/hooks'

import { AppNavigator } from './navigation/app-navigator'

import 'reflect-metadata'
import 'react-native-gesture-handler'

export const App = () => {
  const paperTheme = useDefinedTheme()

  return (
    <PaperProvider theme={paperTheme}>
      <SafeAreaProvider>
        <DBProvider>
          <AppNavigator />
        </DBProvider>
      </SafeAreaProvider>
    </PaperProvider>
  )
}
