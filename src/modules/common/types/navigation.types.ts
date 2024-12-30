import type { BottomTabHeaderProps } from '@react-navigation/bottom-tabs'

export interface TabNavigationOptions {
  tabBarLabel?: string
  tabBarStyle?: {
    display: string
  }
  sceneStyle?: {
    backgroundColor: string
  }
  headerShown?: boolean
}

export interface TabNavigationDescriptor {
  options: TabNavigationOptions
}

export interface MainHeaderProps extends Omit<BottomTabHeaderProps, 'options'> {
  options: TabNavigationOptions
}
