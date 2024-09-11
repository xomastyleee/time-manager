import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AppNavigator } from './navigation/app-navigator'

export const App = () => (
  <SafeAreaProvider>
    <AppNavigator />
  </SafeAreaProvider>
)
