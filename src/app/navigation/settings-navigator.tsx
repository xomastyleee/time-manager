import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { SettingsScreen } from '@modules/settings'

export type HomeStackParamList = {
  SettingsScreen: undefined
}

const { Navigator, Screen } = createStackNavigator<HomeStackParamList>()

export const SettingsNavigator = () => (
  <Navigator
    initialRouteName="SettingsScreen"
    screenOptions={{
      headerShown: false
    }}
  >
    <Screen name="SettingsScreen" component={SettingsScreen} />
  </Navigator>
)
