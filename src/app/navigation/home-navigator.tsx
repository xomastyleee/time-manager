import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { HomeScreen } from '@modules/home'
import { SettingsNavigator } from './settings-navigator'

export type HomeStackParamList = {
  HomeScreen: undefined
  Settings: undefined
}

const { Navigator, Screen } = createStackNavigator<HomeStackParamList>()

export const HomeNavigator = () => (
  <Navigator
    initialRouteName="HomeScreen"
    screenOptions={{
      headerShown: false
    }}
  >
    <Screen name="HomeScreen" component={HomeScreen} />
    <Screen name="Settings" component={SettingsNavigator} />
  </Navigator>
)
