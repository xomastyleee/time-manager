import { FC, ReactNode } from 'react'
import { useAppTheme } from '@common/hooks'
import { Text } from 'react-native-paper'
import { View } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated'

import { stylesWithTheme } from './fallback-screen.styles'
import { MainBackgroundView } from '../main-background-view'

interface FallbackScreenProps {
  isError?: boolean
  isLoading?: boolean
  children?: ReactNode
}

export const FallbackScreen: FC<FallbackScreenProps> = ({ isError, isLoading, children }) => {
  const theme = useAppTheme()
  const styles = stylesWithTheme(theme)

  const spinValue = useSharedValue(0)

  spinValue.value = withRepeat(withTiming(1, { duration: 2000, easing: Easing.linear }), -1, false)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${spinValue.value * 360}deg` }]
  }))

  if (isError) {
    return (
      <MainBackgroundView>
        <Text style={styles.errorTitle}> Ooops... Something went wrong </Text>
        <Text style={styles.errorMessage}>{'There’s been an error. Please try again later.'}</Text>
      </MainBackgroundView>
    )
  }

  if (isLoading) {
    return (
      <MainBackgroundView>
        <View style={styles.loadingContainer}>
          <Animated.View style={[styles.loader, animatedStyle]} />
          <Text style={styles.loadingMessage}> Loading... </Text>
        </View>
      </MainBackgroundView>
    )
  }

  return <>{children}</>
}
