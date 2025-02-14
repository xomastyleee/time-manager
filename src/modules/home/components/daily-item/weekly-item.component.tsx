import React, { FC } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import dayjs from 'dayjs'
import { useStylesWithThemeAndDimensions } from '@common/hooks'

import type { ITask, WeekDayCodes } from '@common/types'
import { stylesWithTheme } from './daily-item.styles'

interface WeeklyItemProps {
  day: WeekDayCodes
  tasks: ITask[]
  currentDate: dayjs.Dayjs
}

export const WeeklyItem: FC<WeeklyItemProps> = ({ day, tasks }) => {
  const { styles } = useStylesWithThemeAndDimensions(stylesWithTheme)
  return (
    <View style={styles.main}>
      <Text>
        {day}: {tasks.length} tasks
      </Text>
    </View>
  )
}
