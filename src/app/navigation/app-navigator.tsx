import React from 'react'
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import BootSplash from 'react-native-bootsplash'
import {
  type BottomTabBarProps,
  type BottomTabNavigationOptions,
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs'
import { AuthGuard, MainBackgroundView, MainHeader, TabBar } from '@common/components'

import type { MainHeaderProps } from '@common/types'
import type { MainParamList } from './navigation-options'
import { AnalyticsNavigator } from './analytics-navigator'
import { GoalsNavigator } from './goals-navigator'
import { HomeNavigator } from './home-navigator'
import { SettingsNavigator } from './settings-navigator'
import { AuthNavigator } from './auth-navigator'

export const navigationRef = createNavigationContainerRef()

const { Navigator, Screen } = createBottomTabNavigator<MainParamList>()

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

export const AppNavigator = () => {
  const { t } = useTranslation('navigation')

  return (
    <NavigationContainer ref={navigationRef} onReady={onReadyNavigationContainer}>
      <MainBackgroundView>
        <AuthGuard fallback={<AuthNavigator />} loadingComponent={<></>}>
          <Navigator initialRouteName="Home" tabBar={renderTabBar} screenOptions={screenOptions}>
            <Screen
              name="Home"
              component={HomeNavigator}
              options={{
                tabBarLabel: t('appNavigator.tabs.home')
              }}
            />
            <Screen
              name="Goals"
              component={GoalsNavigator}
              options={{
                tabBarLabel: t('appNavigator.tabs.goals')
              }}
            />
            <Screen
              name="Analytics"
              component={AnalyticsNavigator}
              options={{
                tabBarLabel: t('appNavigator.tabs.analytics')
              }}
            />
            <Screen
              name="Settings"
              component={SettingsNavigator}
              options={{
                tabBarLabel: t('appNavigator.tabs.settings')
              }}
            />
          </Navigator>
        </AuthGuard>
      </MainBackgroundView>
    </NavigationContainer>
  )
}
