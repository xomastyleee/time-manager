import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { CreateTaskScreen, HomeScreen } from '@modules/home'
import { TaskViewScreen } from '@modules/home/screens/task-view.screen'
import { isLandscape } from '@common/constants'
import { CreateTicketHeader } from '@modules/home/components'

import { type HomeStackParamList, screenOptions } from './navigation-options'

const { Navigator, Screen } = createStackNavigator<HomeStackParamList>()

const createTicketScreenOptions = {
  headerShown: true,
  gestureEnabled: true,
  cardOverlayEnabled: true,
  cardStyle: {
    backgroundColor: 'white',
    marginBottom: isLandscape ? 40 : 60,
    borderRadius: 10
  },
  header: () => <CreateTicketHeader />,
  ...TransitionPresets.ModalPresentationIOS
}

export const HomeNavigator = () => (
  <Navigator initialRouteName="HomeScreen" screenOptions={screenOptions}>
    <Screen name="HomeScreen" component={HomeScreen} />
    <Screen name="TaskView" component={TaskViewScreen} options={createTicketScreenOptions} />
    <Screen name="CreateTaskScreen" component={CreateTaskScreen} options={createTicketScreenOptions} />
  </Navigator>
)
