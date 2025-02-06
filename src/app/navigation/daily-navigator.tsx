import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { DailyScreen } from '@modules/daily'

import { screenOptions } from './navigation-options'

export type DailyStackParamList = {
  DailyScreen: undefined
}

const { Navigator, Screen } = createStackNavigator<DailyStackParamList>()

export const DailyNavigator = () => (
  <Navigator initialRouteName="DailyScreen" screenOptions={screenOptions}>
    <Screen name="DailyScreen" component={DailyScreen} />
  </Navigator>
)
