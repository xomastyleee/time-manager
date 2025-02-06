import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { AnalyticsScreen } from '@modules/analytics'

import { screenOptions } from './navigation-options'

export type AnalyticsStackParamList = {
  AnalyticsScreen: undefined
}

const { Navigator, Screen } = createStackNavigator<AnalyticsStackParamList>()

export const AnalyticsNavigator = () => (
  <Navigator initialRouteName="AnalyticsScreen" screenOptions={screenOptions}>
    <Screen name="AnalyticsScreen" component={AnalyticsScreen} />
  </Navigator>
)
