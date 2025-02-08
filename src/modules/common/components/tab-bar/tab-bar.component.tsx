import React, { FC } from 'react'
import { Pressable, View, ViewStyle } from 'react-native'
import { FAB, Icon } from 'react-native-paper'
import Svg, { Path } from 'react-native-svg'
import { useStylesWithTheme } from '@common/hooks'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'

import { stylesWithTheme } from './tab-bar.styles'

const IconMapper = {
  0: ({ color }: { color: string }) => <Icon size={20} source="home" color={color} />,
  1: ({ color }: { color: string }) => <Icon size={20} source="bullseye-arrow" color={color} />,
  2: ({ color }: { color: string }) => <Icon size={20} source="home-analytics" color={color} />,
  3: ({ color }: { color: string }) => <Icon size={20} source="cog" color={color} />
}

const PositionMapper = {
  0: { left: '10%' },
  1: { left: '30%' },
  2: { right: '30%' },
  3: { right: '10%' }
}

export const TabBar: FC<BottomTabBarProps> = ({ state, navigation }) => {
  const { styles, colors } = useStylesWithTheme(stylesWithTheme)

  return (
    <View style={styles.tabBar}>
      <View style={styles.leftBar} />
      <View style={styles.centerCutout}>
        <Svg height="80" width="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <Path d="M0,20 Q50,70 100,20 L100,100 L0,100 Z" fill={colors.background} />
        </Svg>
      </View>
      <View style={styles.rightBar} />
      <FAB style={styles.fab} icon="plus" />

      {state.routes.map((route, index) => {
        const isFocused = state.index === index

        return (
          <Pressable
            key={route.key}
            style={[styles.iconWrapper, PositionMapper[index as keyof typeof PositionMapper] as ViewStyle]}
            onPress={() => navigation.navigate(route.name)}
          >
            {IconMapper[index as keyof typeof IconMapper]({
              color: isFocused ? colors.primary : colors.onBackground
            })}
          </Pressable>
        )
      })}
    </View>
  )
}
