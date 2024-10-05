import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { PaperProvider } from 'react-native-paper'
import { useDefinedTheme } from '@common/hooks'
import { AppNavigator } from './navigation/app-navigator'

import 'reflect-metadata'

export const App = () => {
  const paperTheme = useDefinedTheme()
  return (
    <PaperProvider theme={paperTheme}>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </PaperProvider>
  )
}
