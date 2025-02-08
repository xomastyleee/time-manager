import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { AnalyticsScreen } from '@modules/analytics'

import { type AnalyticsStackParamList, screenOptions } from './navigation-options'

const { Navigator, Screen } = createStackNavigator<AnalyticsStackParamList>()

export const AnalyticsNavigator = () => (
  <Navigator initialRouteName="AnalyticsScreen" screenOptions={screenOptions}>
    <Screen name="AnalyticsScreen" component={AnalyticsScreen} />
  </Navigator>
)
