import React, { useEffect, useState } from 'react'
import { PaperProvider } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { DBProvider } from '@common/db/core'
import { useDefinedTheme } from '@common/hooks'

import { initI18n } from '../locales/i18n'
import { AppNavigator } from './navigation/app-navigator'

import 'reflect-metadata'
import 'react-native-gesture-handler'

export const App = () => {
  const [isI18nInitialized, setIsI18nInitialized] = useState(false)
  const paperTheme = useDefinedTheme()

  useEffect(() => {
    initI18n('en').then(() => setIsI18nInitialized(true))
  }, [])

  if (!isI18nInitialized) {
    // TODO: Replace with loader
    return null
  }

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
