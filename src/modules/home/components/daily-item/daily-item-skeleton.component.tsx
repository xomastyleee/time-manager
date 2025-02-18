import { useStylesWithThemeAndDimensions } from '@modules/common/hooks'
import React, { FC, useEffect } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated'

import { stylesWithTheme } from './daily-item.styles'

interface DailyItemSkeletonProps {
  numberOfItems: number
}

export const DailyItemSkeletonComponent: FC<DailyItemSkeletonProps> = ({ numberOfItems }) => {
  const { styles } = useStylesWithThemeAndDimensions(stylesWithTheme)
  const opacity = useSharedValue(1)

  useEffect(() => {
    opacity.value = withRepeat(withTiming(0.5, { duration: 500 }), -1, true)
  }, [opacity])

  const animatedStyles = useAnimatedStyle(
    () => ({
      opacity: opacity.value
    }),
    [opacity]
  )

  return (
    <>
      {Array.from({ length: numberOfItems }).map((_, index) => (
        <Animated.View key={index} style={[animatedStyles, styles.main]} />
      ))}
    </>
  )
}
