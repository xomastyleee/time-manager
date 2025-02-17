import React, { FC } from 'react'
import { FlatList } from 'react-native'
import { DailyMode } from '@modules/common/constants'

import type { DailyViewProps, WeekDayCodes } from '@common/types'
// import { DailyItemSkeletonComponent } from '../daily-item/daily-item-skeleton.component'
import { DailyItemComponent } from '../daily-item/daily-item.component'
import { WeeklyItem } from '../daily-item/weekly-item.component'

export const DailyViewComponent: FC<DailyViewProps> = ({
  userTasks,
  userTasksByWeeks,
  // isLoading,
  dailyMode,
  currentDate,
  onDateChange,
  onDailyModeChange
}) => {
  // if (isLoading) {
  //   return <DailyItemSkeletonComponent numberOfItems={4} />
  // }

  if (dailyMode === DailyMode.DAY) {
    return (
      <FlatList
        data={userTasks}
        renderItem={({ item }) => <DailyItemComponent item={item} />}
        keyExtractor={(item) => `${item.id}`}
        scrollEnabled={false}
      />
    )
  }

  return (
    <FlatList
      data={Object.values(userTasksByWeeks)}
      renderItem={({ item, index }) => (
        <WeeklyItem
          day={index as WeekDayCodes}
          tasks={item}
          currentDate={currentDate}
          onDateChange={onDateChange}
          onDailyModeChange={onDailyModeChange}
        />
      )}
      keyExtractor={(_, index) => `userTasksByWeeks-${index}`}
      scrollEnabled={false}
    />
  )
}
