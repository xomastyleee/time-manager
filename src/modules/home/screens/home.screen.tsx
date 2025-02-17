import React, { useCallback, useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import dayjs from 'dayjs'
import { ContentView, ScreenView } from '@common/components'
import { type CreateStylesProps, useStylesWithThemeAndDimensions, useUserTaskModel } from '@common/hooks'
import { DailyMode } from '@common/constants'

import { DailyHeaderComponent, DailyViewComponent } from '../components'

export const HomeScreen = () => {
  const { styles } = useStylesWithThemeAndDimensions(stylesWithTheme)

  const [dailyMode, setDailyMode] = useState(DailyMode.DAY)
  const [currentDate, setCurrentDate] = useState(dayjs())

  const { userTasks, userTasksByWeeks, isLoading } = useUserTaskModel({ dailyMode, currentDate })

  const isCurrentDate = useMemo(() => currentDate.isSame(dayjs(), 'day'), [currentDate])

  const handleDateChange = useCallback(
    (newDate: dayjs.Dayjs) => {
      setCurrentDate(newDate)
    },
    [setCurrentDate]
  )

  return (
    <ScreenView>
      <ContentView style={styles.main}>
        <DailyHeaderComponent
          dailyMode={dailyMode}
          currentDate={currentDate}
          isCurrentDate={isCurrentDate}
          onDateChange={handleDateChange}
          onDailyModeChange={setDailyMode}
        />
        <View style={styles.dailyView}>
          <DailyViewComponent
            userTasks={userTasks}
            userTasksByWeeks={userTasksByWeeks}
            isLoading={isLoading}
            dailyMode={dailyMode}
            currentDate={currentDate}
            onDateChange={handleDateChange}
            onDailyModeChange={setDailyMode}
          />
        </View>
      </ContentView>
    </ScreenView>
  )
}

const stylesWithTheme = ({ dimensions: { height } }: CreateStylesProps) =>
  StyleSheet.create({
    dailyView: {
      paddingVertical: 30
    },
    main: {
      minHeight: height * 0.8
    }
  })
