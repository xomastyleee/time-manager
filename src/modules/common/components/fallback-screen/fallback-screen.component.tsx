import React, { FC, PropsWithChildren } from 'react'
import { useAppTheme } from '@common/hooks'
import { Text } from 'react-native-paper'
import { View } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated'
import { useTranslation } from 'react-i18next'

import { stylesWithTheme } from './fallback-screen.styles'
import { MainBackgroundView } from '../main-background-view'

interface FallbackScreenProps extends PropsWithChildren {
  isError?: boolean
  isLoading?: boolean
}

export const FallbackScreen: FC<FallbackScreenProps> = ({ isError, isLoading, children }) => {
  const theme = useAppTheme()
  const { t } = useTranslation('components')

  const styles = stylesWithTheme(theme)

  const spinValue = useSharedValue(0)

  spinValue.value = withRepeat(withTiming(1, { duration: 2000, easing: Easing.linear }), -1, false)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${spinValue.value * 360}deg` }]
  }))

  if (isError) {
    return (
      <MainBackgroundView>
        <Text style={styles.errorTitle}> {t('fallbackScreen.error.title')} </Text>
        <Text style={styles.errorMessage}>{t('fallbackScreen.error.message')}</Text>
      </MainBackgroundView>
    )
  }

  if (isLoading) {
    return (
      <MainBackgroundView>
        <View style={styles.loadingContainer}>
          <Animated.View style={[styles.loader, animatedStyle]} />
          <Text style={styles.loadingMessage}> {t('fallbackScreen.loading')} </Text>
        </View>
      </MainBackgroundView>
    )
  }

  return <>{children}</>
}
