import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { SettingsScreen, ProfileScreen } from '@modules/settings'

import { screenOptions } from './navigation-options'

export type SettingsStackParamList = {
  SettingsScreen: undefined
  ProfileScreen: undefined
}

const { Navigator, Screen } = createStackNavigator<SettingsStackParamList>()

export const SettingsNavigator = () => (
  <Navigator initialRouteName="SettingsScreen" screenOptions={screenOptions}>
    <Screen name="SettingsScreen" component={SettingsScreen} />
    <Screen name="ProfileScreen" component={ProfileScreen} />
  </Navigator>
)
