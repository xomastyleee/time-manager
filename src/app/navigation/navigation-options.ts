import { type ParamListBase, useNavigation } from '@react-navigation/native'

import type { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack'

export const screenOptions: StackNavigationOptions = {
  headerShown: false,
  cardStyle: { backgroundColor: 'transparent' },
  animation: 'scale_from_center',
  gestureEnabled: true,
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {
        duration: 100
      }
    },
    close: {
      animation: 'timing',
      config: {
        duration: 100
      }
    }
  }
}

export type HomeStackParamList = {
  HomeScreen: undefined
  CreateTaskScreen: undefined
  CreateTicketScreen: undefined
  TaskView: { id: number }
}

export type GoalsStackParamList = {
  GoalsScreen: undefined
}

export type AnalyticsStackParamList = {
  AnalyticsScreen: undefined
}

export type SettingsStackParamList = {
  SettingsScreen: undefined
  ProfileScreen: undefined
}

export type AuthStackParamList = {
  AuthScreen: undefined
}

export type RouteParams<Params = Record<string, unknown>> = {
  route: {
    params: Params
    name: string
  }
}

type HomeScreens = 'HomeScreen' | 'CreateTaskScreen' | 'TaskView'
type GoalsScreens = 'GoalsScreen'
type AnalyticsScreens = 'AnalyticsScreen'
type SettingsScreens = 'SettingsScreen' | 'ProfileScreen'

export type MainParamList = {
  Home: { screen: HomeScreens }
  Goals: { screen: GoalsScreens }
  Analytics: { screen: AnalyticsScreens }
  Settings: { screen: SettingsScreens }
}

export const useTypedNavigation = <T extends ParamListBase>() => useNavigation<StackNavigationProp<T>>()
export const useMainNavigation = useNavigation<StackNavigationProp<MainParamList>>
