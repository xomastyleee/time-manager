import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { AnalyticsScreen } from '@modules/analytics'

export type HomeStackParamList = {
  AnalyticsScreen: undefined
}

const { Navigator, Screen } = createStackNavigator<HomeStackParamList>()

export const AnalyticsNavigator = () => (
  <Navigator
    initialRouteName="AnalyticsScreen"
    screenOptions={{
      headerShown: false
    }}
  >
    <Screen name="AnalyticsScreen" component={AnalyticsScreen} />
  </Navigator>
)
