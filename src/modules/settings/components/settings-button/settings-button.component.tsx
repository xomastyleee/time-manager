import React, { FC } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Icon, Text } from 'react-native-paper'
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated'
import { useAppTheme } from '@common/hooks'
import { AppTheme } from '@common/theme'

interface SettingsButtonProps {
  title: string
  iconName: string
  iconSize?: number
  bottomDivider?: boolean
  onPress: () => void
}

export const SettingsButton: FC<SettingsButtonProps> = ({
  iconName,
  title,
  iconSize = 20,
  bottomDivider = true,
  onPress
}) => {
  const theme = useAppTheme()
  const styles = stylesWithTheme(theme)
  const scale = useSharedValue(1)

  const borderStyles = bottomDivider
    ? { borderBottomWidth: 1, borderBottomColor: theme.colors.backgroundText, borderRadius: '5%' }
    : {}

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }))

  const handlePressIn = () => {
    scale.value = withSpring(0.95)
  }

  const handlePressOut = () => {
    scale.value = withSpring(1)
  }

  return (
    <View style={[styles.container, borderStyles]}>
      <Animated.View style={animatedStyle}>
        <TouchableOpacity onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={onPress} style={styles.main}>
          <Text variant="bodyLarge" style={styles.title}>
            {title}
          </Text>
          <View style={styles.iconWrapper}>
            <Icon source={iconName} size={iconSize} color={theme.colors.backgroundText} />
            <Icon source="chevron-right" size={iconSize} color={theme.colors.backgroundText} />
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}

const stylesWithTheme = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      width: '100%'
    },
    iconWrapper: {
      flexDirection: 'row'
    },
    main: {
      alignItems: 'center',
      backgroundColor: theme.colors.transparent,
      borderRadius: 5,
      flexDirection: 'row',
      height: 65,
      justifyContent: 'space-between',
      padding: 10
    },
    title: {
      color: theme.colors.backgroundText,
      fontWeight: '500'
    }
  })
