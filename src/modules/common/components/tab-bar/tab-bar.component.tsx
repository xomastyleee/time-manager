import React, { FC, useEffect, useMemo, useState } from 'react'
import { Pressable, View, ViewStyle, Dimensions } from 'react-native'
import { FAB, Icon, Portal } from 'react-native-paper'
import Svg, { Path } from 'react-native-svg'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { useStylesWithThemeAndDimensions } from '@common/hooks'
import { isAndroid } from '@common/constants'

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
  const { styles, colors } = useStylesWithThemeAndDimensions(stylesWithTheme)

  const [isLandscape, setIsLandscape] = useState(Dimensions.get('window').width > Dimensions.get('window').height)

  const fabStylesWithLandscapeGapIos = useMemo(() => ({ bottom: isLandscape ? 15 : 0 }), [isLandscape])
  const fabStylesWithLandscapeGapAndroid = useMemo(() => ({ bottom: 35 }), [])

  const [isFabOpened, setIsFabOpened] = useState(false)

  const fabActions = useMemo(
    () => [
      {
        icon: 'pencil-outline',
        label: 'Create new task',
        style: { marginBottom: 100 },
        labelStyle: { marginBottom: 100 },
        onPress: () => console.log('Pressed add')
      }
    ],
    []
  )

  const handleStateChange = ({ open }: { open: boolean }) => {
    setIsFabOpened(open)
  }

  useEffect(() => {
    const onChange = ({ window }: { window: { width: number; height: number } }) => {
      setIsLandscape(window.width > window.height)
    }

    const subscription = Dimensions.addEventListener('change', onChange)

    return () => subscription?.remove()
  }, [])

  return (
    <View style={styles.tabBar}>
      <View style={styles.leftBar} />
      <View style={styles.centerCutout}>
        <Svg height="80" width="64" viewBox="0 0 100 100" preserveAspectRatio="none">
          <Path d="M0,20 Q50,70 100,20 L100,100 L0,100 Z" fill={colors.background} />
        </Svg>
      </View>
      <View style={styles.rightBar} />
      <Portal>
        <FAB.Group
          visible
          icon={isFabOpened ? 'close' : 'plus'}
          fabStyle={[styles.fab, isAndroid ? fabStylesWithLandscapeGapAndroid : fabStylesWithLandscapeGapIos]}
          open={isFabOpened}
          onStateChange={handleStateChange}
          actions={fabActions}
        />
      </Portal>

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
