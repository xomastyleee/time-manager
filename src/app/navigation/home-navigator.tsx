import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { HomeScreen } from '@modules/home'

import { screenOptions } from './navigation-options'

export type HomeStackParamList = {
  HomeScreen: undefined
  Settings: undefined
}

const { Navigator, Screen } = createStackNavigator<HomeStackParamList>()

export const HomeNavigator = () => (
  <Navigator initialRouteName="HomeScreen" screenOptions={screenOptions}>
    <Screen name="HomeScreen" component={HomeScreen} />
  </Navigator>
)
