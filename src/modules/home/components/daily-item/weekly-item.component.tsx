import React, { FC, useState } from 'react'
import { Pressable, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native-paper'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import dayjs from 'dayjs'
import { useStylesWithThemeAndDimensions } from '@common/hooks'
import { DailyMode, DATE_FORMAT_DAY } from '@common/constants'

import type { ITask, WeekDayCodes } from '@common/types'
import { stylesWithTheme } from './daily-item.styles'

interface WeeklyItemProps {
  day: WeekDayCodes
  tasks: ITask[]
  currentDate: dayjs.Dayjs
  onDateChange: (newDate: dayjs.Dayjs) => void
  onDailyModeChange: (mode: DailyMode) => void
}

const getWeekDayName = (day: WeekDayCodes): string => dayjs().day(day).format('dddd')

export const WeeklyItem: FC<WeeklyItemProps> = ({ day, tasks, currentDate, onDateChange, onDailyModeChange }) => {
  const { styles } = useStylesWithThemeAndDimensions(stylesWithTheme)
  const weekDayDate = currentDate.startOf('week').add(day, 'day').format(DATE_FORMAT_DAY)
  const isCurrentDay = currentDate.isSame(currentDate.startOf('week').add(day, 'day'), 'day')

  const [expanded, setExpanded] = useState(false)
  const animatedHeight = useSharedValue(0)

  const handlePress = () => {
    const newDate = currentDate.startOf('week').add(day, 'day')
    onDateChange(newDate)
    setExpanded(!expanded)
    animatedHeight.value = withTiming(expanded ? 0 : 200, { duration: 300 })
  }

  const animatedStyle = useAnimatedStyle(
    () => ({
      height: animatedHeight.value
    }),
    [animatedHeight]
  )

  const handleViewAll = () => onDailyModeChange(DailyMode.DAY)

  return (
    <TouchableOpacity
      style={[styles.main, styles.weekItem, isCurrentDay ? styles.currentDay : undefined]}
      onPress={handlePress}
    >
      <Text style={isCurrentDay ? styles.currentDayText : undefined}>
        {getWeekDayName(day)}: {weekDayDate}
      </Text>
      <Animated.View style={[styles.animatedContainer, animatedStyle]}>
        <View style={styles.taskContainer}>
          {tasks.slice(0, 3).map((task) => (
            <Pressable key={`week-item-${task.id}`} onPress={() => null} style={styles.taskNavigationButton}>
              <Text>{task.title}</Text>
            </Pressable>
          ))}
        </View>
        <Pressable onPress={handleViewAll} style={styles.taskNavigationButton}>
          <Text>View All</Text>
        </Pressable>
      </Animated.View>
    </TouchableOpacity>
  )
}
