import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { AuthScreen } from '@modules/auth'

import { screenOptions } from './navigation-options'

export type AuthStackParamList = {
  AuthScreen: undefined
}

const { Navigator, Screen } = createStackNavigator<AuthStackParamList>()

export const AuthNavigator = () => (
  <Navigator initialRouteName="AuthScreen" screenOptions={screenOptions}>
    <Screen name="AuthScreen" component={AuthScreen} />
  </Navigator>
)
