import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { CreateTicketScreen, HomeScreen } from '@modules/home'

import { type HomeStackParamList, screenOptions } from './navigation-options'

const { Navigator, Screen } = createStackNavigator<HomeStackParamList>()

const createTicketScreenOptions = {
  headerShown: false,
  gestureEnabled: true,
  cardOverlayEnabled: true,
  cardStyle: { backgroundColor: 'white' },
  ...TransitionPresets.ModalPresentationIOS
}

export const HomeNavigator = () => (
  <Navigator initialRouteName="HomeScreen" screenOptions={screenOptions}>
    <Screen name="HomeScreen" component={HomeScreen} />
    <Screen name="CreateTicketScreen" component={CreateTicketScreen} options={createTicketScreenOptions} />
  </Navigator>
)
