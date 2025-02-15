import React, { FC, useCallback, useMemo } from 'react'
import { Pressable, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { IconButton, Text } from 'react-native-paper'
import dayjs from 'dayjs'
import { useStylesWithThemeAndDimensions } from '@common/hooks'
import { DailyMode, DATE_FORMAT_DAY, DATE_FORMAT_WEEK } from '@common/constants'
import { useTranslation } from 'react-i18next'

import type { DailyHeaderProps } from '@common/types'
import { stylesWithTheme } from './daily-header.styles'

export const DailyHeaderComponent: FC<DailyHeaderProps> = ({
  dailyMode,
  currentDate,
  isCurrentDate,
  onDateChange,
  onDailyModeChange
}) => {
  const { styles } = useStylesWithThemeAndDimensions(stylesWithTheme)
  const { t } = useTranslation('components')

  const weekStart = currentDate.startOf('week').format(DATE_FORMAT_WEEK)
  const weekEnd = currentDate.endOf('week').format(DATE_FORMAT_WEEK)

  const isDayMode = useMemo(() => dailyMode === DailyMode.DAY, [dailyMode])

  const togglePositionSharedValue = useSharedValue(isDayMode ? 0 : 30)
  const setToCurrentDateButtonOpacity = useSharedValue(isCurrentDate ? 0 : 1)

  const toggleAnimationStyle = useAnimatedStyle(
    () => ({
      left: togglePositionSharedValue.value
    }),
    [togglePositionSharedValue]
  )

  const buttonOpacityAnimatedStyle = useAnimatedStyle(
    () => ({
      opacity: withTiming(isCurrentDate ? 0 : 1, { duration: 200 })
    }),
    [isCurrentDate, setToCurrentDateButtonOpacity]
  )

  const onTogglePress = useCallback(() => {
    togglePositionSharedValue.value = withTiming(isDayMode ? 30 : 0, { duration: 200 })

    onDailyModeChange(isDayMode ? DailyMode.WEEK : DailyMode.DAY)
  }, [isDayMode, onDailyModeChange, togglePositionSharedValue])

  const handlePreviousPress = useCallback(() => {
    const newDate = isDayMode ? currentDate.subtract(1, 'day') : currentDate.subtract(1, 'week')

    onDateChange(newDate)
  }, [isDayMode, currentDate, onDateChange])

  const handleNextPress = useCallback(() => {
    const newDate = isDayMode ? currentDate.add(1, 'day') : currentDate.add(1, 'week')

    onDateChange(newDate)
  }, [isDayMode, currentDate, onDateChange])

  const handleGoToCurrentPress = useCallback(() => {
    togglePositionSharedValue.value = withTiming(0, { duration: 200 })

    onDateChange(dayjs())
    onDailyModeChange(DailyMode.DAY)
  }, [onDailyModeChange, onDateChange, togglePositionSharedValue])

  return (
    <View style={styles.container}>
      <View style={styles.dailyBadge}>
        <IconButton icon="arrow-left-drop-circle-outline" size={24} onPress={handlePreviousPress} />
        <Text>{isDayMode ? currentDate.format(DATE_FORMAT_DAY) : `${weekStart} - ${weekEnd}`}</Text>
        <IconButton icon="arrow-right-drop-circle-outline" size={24} onPress={handleNextPress} />
        <Animated.View style={[buttonOpacityAnimatedStyle, styles.setToCurrentDateButtonWrapper]}>
          <Pressable style={styles.setToCurrentDateButton} onPress={handleGoToCurrentPress}>
            <Text>{t('dailyHeader.goToCurrent')}</Text>
          </Pressable>
        </Animated.View>
      </View>
      <Pressable style={styles.calendarModeSwitch} onPress={onTogglePress}>
        <Animated.View style={[toggleAnimationStyle, styles.toggle]} />
        <Text style={styles.switchText}>{t('dailyHeader.dayMode')}</Text>
        <Text style={styles.switchText}>{t('dailyHeader.weekMode')}</Text>
      </Pressable>
    </View>
  )
}
