import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { DailyScreen } from '@modules/daily'

export type HomeStackParamList = {
  DailyScreen: undefined
}

const { Navigator, Screen } = createStackNavigator<HomeStackParamList>()

export const DailyNavigator = () => (
  <Navigator
    initialRouteName="DailyScreen"
    screenOptions={{
      headerShown: false
    }}
  >
    <Screen name="DailyScreen" component={DailyScreen} />
  </Navigator>
)
