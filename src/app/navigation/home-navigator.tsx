import React from 'react'
import { createStackNavigator, type StackNavigationOptions } from '@react-navigation/stack'
import { HomeScreen } from '@modules/home'

export type HomeStackParamList = {
  HomeScreen: undefined
  Settings: undefined
}

const { Navigator, Screen } = createStackNavigator<HomeStackParamList>()

const screenOptions: StackNavigationOptions = {
  headerShown: false,
  cardStyle: { backgroundColor: 'transparent' }
}

export const HomeNavigator = () => (
  <Navigator initialRouteName="HomeScreen" screenOptions={screenOptions}>
    <Screen name="HomeScreen" component={HomeScreen} options={{ cardStyle: { backgroundColor: 'transparent' } }} />
  </Navigator>
)
