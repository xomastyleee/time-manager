import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { AuthScreen } from '@modules/auth'

import { type AuthStackParamList, screenOptions } from './navigation-options'

const { Navigator, Screen } = createStackNavigator<AuthStackParamList>()

export const AuthNavigator = () => (
  <Navigator initialRouteName="AuthScreen" screenOptions={screenOptions}>
    <Screen name="AuthScreen" component={AuthScreen} />
  </Navigator>
)
