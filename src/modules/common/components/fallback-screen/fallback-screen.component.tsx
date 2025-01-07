import React, { FC, ReactNode } from 'react'
import { useAppTheme } from '@common/hooks'
import { Text } from 'react-native-paper'
import { Animated, Easing, View } from 'react-native'

import { stylesWithTheme } from './fallback-screen.styles'
import { MainBackgroundView } from '../main-background-view'

interface FallbackScreenProps {
  error?: boolean
  isLoading?: boolean
  children?: ReactNode
}

export const FallbackScreen: FC<FallbackScreenProps> = ({ error, isLoading, children }) => {
  const theme = useAppTheme()
  const styles = stylesWithTheme(theme)
  const spinValue = new Animated.Value(0)
  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true
    })
  ).start()

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  if (error) {
    return (
      <MainBackgroundView>
        <Text style={styles.errorTitle}> Ooops... Something went wrong </Text>
        <Text style={styles.errorMessage}> There&apos;s been an error. Try again later. </Text>
      </MainBackgroundView>
    )
  }

  if (isLoading) {
    return (
      <MainBackgroundView>
        <View style={styles.loadingContainer}>
          <Animated.View style={[styles.loader, { transform: [{ rotate: spin }] }]} />
          <Text style={styles.loadingMessage}> Loading... </Text>
        </View>
      </MainBackgroundView>
    )
  }

  return <>{children}</>
}
