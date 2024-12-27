import React, { FC } from 'react'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'

interface ScreenGapProps {
  height: number
}

export const ScreenGap: FC<ScreenGapProps> = ({ height }) => {
  const animatedStyle = useAnimatedStyle(
    () => ({
      height: withTiming(height, { duration: 500 })
    }),
    [height]
  )

  return <Animated.View style={animatedStyle} />
}
