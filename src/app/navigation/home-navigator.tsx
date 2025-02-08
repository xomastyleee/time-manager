import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { HomeScreen } from '@modules/home'

import { type HomeStackParamList, screenOptions } from './navigation-options'

const { Navigator, Screen } = createStackNavigator<HomeStackParamList>()

export const HomeNavigator = () => (
  <Navigator initialRouteName="HomeScreen" screenOptions={screenOptions}>
    <Screen name="HomeScreen" component={HomeScreen} />
  </Navigator>
)
