import React from 'react'
import { createStackNavigator, type StackNavigationOptions } from '@react-navigation/stack'
import { DailyScreen } from '@modules/daily'

export type HomeStackParamList = {
  DailyScreen: undefined
}

const { Navigator, Screen } = createStackNavigator<HomeStackParamList>()

const screenOptions: StackNavigationOptions = {
  headerShown: false,
  cardStyle: { backgroundColor: 'transparent' }
}

export const DailyNavigator = () => (
  <Navigator initialRouteName="DailyScreen" screenOptions={screenOptions}>
    <Screen name="DailyScreen" component={DailyScreen} />
  </Navigator>
)
