import React from 'react'
import { PaperProvider } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import { DBProvider } from '@common/db/core'
import { useDefinedTheme } from '@common/hooks'

import { detectAndInitAppLanguage } from '../locales/utils/languageDetector'
import { AppNavigator } from './navigation/app-navigator'

import 'reflect-metadata'
import 'react-native-gesture-handler'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(isBetween)
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

detectAndInitAppLanguage()

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
