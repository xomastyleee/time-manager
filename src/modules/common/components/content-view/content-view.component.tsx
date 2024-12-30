import React, { FC } from 'react'
import { View, ViewProps } from 'react-native'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { useCalculatedScreenGap } from '@common/hooks'

interface ContentViewProps extends ViewProps, React.PropsWithChildren<object> {
  animationDuration?: number
  isGapDisabled?: boolean
  isGapActive?: boolean
}

export const ContentView: FC<ContentViewProps> = (props) => {
  const { viewRef, gap, handleLayout } = useCalculatedScreenGap(props.isGapActive)

  const animatedStyle = useAnimatedStyle(
    () => ({
      height: withTiming(gap, { duration: props.animationDuration ?? 300 })
    }),
    [gap, props.animationDuration]
  )

  return (
    <View ref={viewRef} {...props} onTouchStart={handleLayout}>
      {props.children}
      {!props.isGapDisabled && <Animated.View style={animatedStyle} />}
    </View>
  )
}
