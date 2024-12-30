import React from 'react'
import { createStackNavigator, type StackNavigationOptions } from '@react-navigation/stack'
import { AnalyticsScreen } from '@modules/analytics'

export type HomeStackParamList = {
  AnalyticsScreen: undefined
}

const { Navigator, Screen } = createStackNavigator<HomeStackParamList>()

const screenOptions: StackNavigationOptions = {
  headerShown: false,
  cardStyle: { backgroundColor: 'transparent' }
}

export const AnalyticsNavigator = () => (
  <Navigator initialRouteName="AnalyticsScreen" screenOptions={screenOptions}>
    <Screen name="AnalyticsScreen" component={AnalyticsScreen} />
  </Navigator>
)
