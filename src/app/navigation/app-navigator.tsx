import React from 'react'
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native'
import BootSplash from 'react-native-bootsplash'
import {
  type BottomTabBarProps,
  type BottomTabNavigationOptions,
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs'
import { MainBackgroundView, MainHeader, TabBar } from '@common/components'

import type { MainHeaderProps } from '@common/types'
import { AnalyticsNavigator } from './analytics-navigator'
import { DailyNavigator } from './daily-navigator'
import { HomeNavigator } from './home-navigator'
import { SettingsNavigator } from './settings-navigator'

export const navigationRef = createNavigationContainerRef()

const { Navigator, Screen } = createBottomTabNavigator()

const screenOptions: BottomTabNavigationOptions = {
  tabBarStyle: { display: 'none' },
  sceneStyle: { backgroundColor: 'transparent' },
  // @ts-expect-error: MainHeaderProps is overwritten BottomTabHeaderProps
  header: (props: MainHeaderProps) => <MainHeader {...props} />
}

const renderTabBar = (props: BottomTabBarProps) => <TabBar {...props} />

const onReadyNavigationContainer = () => {
  BootSplash.hide({ fade: true })
}

export const AppNavigator = () => (
  <NavigationContainer ref={navigationRef} onReady={onReadyNavigationContainer}>
    <MainBackgroundView>
      <Navigator initialRouteName="Home" tabBar={renderTabBar} screenOptions={screenOptions}>
        <Screen
          name="Daily"
          component={DailyNavigator}
          options={{
            tabBarLabel: 'Daily'
          }}
        />
        <Screen
          name="Home"
          component={HomeNavigator}
          options={{
            tabBarLabel: 'Home'
          }}
        />
        <Screen
          name="Analytics"
          component={AnalyticsNavigator}
          options={{
            tabBarLabel: 'Analytics'
          }}
        />
        <Screen
          name="Settings"
          component={SettingsNavigator}
          options={{
            tabBarLabel: 'Settings'
          }}
        />
      </Navigator>
    </MainBackgroundView>
  </NavigationContainer>
)
