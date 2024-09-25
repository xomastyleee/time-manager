import React from 'react'
import { Icon } from 'react-native-paper'
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation'
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native'
import { HomeNavigator } from './home-navigator'
import { DailyNavigator } from './daily-navigator'
import { AnalyticsNavigator } from './analytics-navigator'

const { Navigator, Screen } = createMaterialBottomTabNavigator()
export const navigationRef = createNavigationContainerRef()

export const AppNavigator = () => (
  <NavigationContainer ref={navigationRef}>
    <Navigator initialRouteName="Home">
      <Screen
        name="Daily"
        component={DailyNavigator}
        options={{
          tabBarLabel: 'Daily',
          tabBarIcon: ({ color }: { color: string }) => <Icon size={20} source="calendar-today" color={color} />
        }}
      />
      <Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }: { color: string }) => <Icon size={20} source="home" color={color} />
        }}
      />
      <Screen
        name="Analytics"
        component={AnalyticsNavigator}
        options={{
          tabBarLabel: 'Analytics',
          tabBarIcon: ({ color }: { color: string }) => <Icon size={20} source="home-analytics" color={color} />
        }}
      />
    </Navigator>
  </NavigationContainer>
)
