import React, { FC } from 'react'
import { View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useStylesWithThemeAndDimensions } from '@common/hooks'
import { useMainNavigation } from '@navigation/navigation-options'

import { stylesWithTheme } from './main-header.styles'
import type { MainHeaderProps } from '@modules/common/types'

export const MainHeader: FC<MainHeaderProps> = ({ options }) => {
  const { styles, colors } = useStylesWithThemeAndDimensions(stylesWithTheme)
  const { getState, navigate } = useMainNavigation()

  const state = getState()

  const { state: currentRouteState, name } = state?.routes[state?.index] ?? {}

  const handleBackPress = () => {
    const routeName = name ?? 'Home'
    const screen = currentRouteState?.routeNames?.[0] ?? 'HomeScreen'
    navigate(routeName as 'Home', { screen: screen as 'HomeScreen' })
  }

  return (
    <SafeAreaView edges={['top']}>
      <View style={styles.main}>
        <View style={styles.labelWrapper}>
          {currentRouteState && currentRouteState.routes[currentRouteState?.index ?? 0]?.name !== `${name}Screen` && (
            <IconButton iconColor={colors.onBackground} icon="arrow-left" size={20} onPress={handleBackPress} />
          )}
          <Text variant="titleLarge" style={styles.label}>
            {options.tabBarLabel}
          </Text>
        </View>
        <View style={styles.iconButtonWrapper}>
          <IconButton iconColor={colors.onBackground} icon="bell" size={20} />
        </View>
      </View>
    </SafeAreaView>
  )
}
