import React, { FC } from 'react'
import { StyleSheet, View, ViewProps, ViewStyle, StyleProp } from 'react-native'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { useAppTheme, useCalculatedScreenGap } from '@common/hooks'

import type { AppTheme } from '@common/theme'

interface ContentViewProps extends ViewProps, React.PropsWithChildren<object> {
  animationDuration?: number
  isGapDisabled?: boolean
  isGapActive?: boolean
}

export const ContentView: FC<ContentViewProps> = (props) => {
  const theme = useAppTheme()
  const styles = stylesWithTheme(theme)

  const styleOverride: StyleProp<ViewStyle> = props.style ?? {}

  const { viewRef, gap, handleLayout } = useCalculatedScreenGap(props.isGapActive)
  const animatedStyle = useAnimatedStyle(
    () => ({
      height: withTiming(gap, { duration: props.animationDuration ?? 300 })
    }),
    [gap, props.animationDuration]
  )

  return (
    <View ref={viewRef} {...props} style={[styles.main, styleOverride]} onTouchStart={handleLayout}>
      {props.children}
      {!props.isGapDisabled && <Animated.View style={animatedStyle} />}
    </View>
  )
}

const stylesWithTheme = (theme: AppTheme) =>
  StyleSheet.create({
    main: {
      backgroundColor: theme.colors.screenContent,
      borderRadius: '5%',
      marginHorizontal: '3%',
      padding: '3%'
    }
  })
