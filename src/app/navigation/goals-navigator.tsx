import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { GoalsScreen } from '@modules/goals'

import { screenOptions } from './navigation-options'

export type GoalsStackParamList = {
  GoalsScreen: undefined
}

const { Navigator, Screen } = createStackNavigator<GoalsStackParamList>()

export const GoalsNavigator = () => (
  <Navigator initialRouteName="GoalsScreen" screenOptions={screenOptions}>
    <Screen name="GoalsScreen" component={GoalsScreen} />
  </Navigator>
)
