import React from 'react'
import { Icon } from 'react-native-paper'
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation'
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native'
import { HomeScreen } from '../../modules/home/screens/home.screen'

const { Navigator, Screen } = createMaterialBottomTabNavigator()

export const navigationRef = createNavigationContainerRef()

export const AppNavigator = () => (
  <NavigationContainer ref={navigationRef}>
    <Navigator>
      <Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }: { color: string }) => <Icon size={20} source="home" color={color} />
        }}
      />
    </Navigator>
  </NavigationContainer>
)
