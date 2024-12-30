import React from 'react'
import { createStackNavigator, type StackNavigationOptions } from '@react-navigation/stack'
import { SettingsScreen } from '@modules/settings'

export type HomeStackParamList = {
  SettingsScreen: undefined
}

const { Navigator, Screen } = createStackNavigator<HomeStackParamList>()

const screenOptions: StackNavigationOptions = {
  headerShown: false,
  cardStyle: { backgroundColor: 'transparent' }
}

export const SettingsNavigator = () => (
  <Navigator initialRouteName="SettingsScreen" screenOptions={screenOptions}>
    <Screen name="SettingsScreen" component={SettingsScreen} />
  </Navigator>
)
