import React, { FC } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Chip, Text } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import { useStylesWithThemeAndDimensions } from '@common/hooks'
import { formatDuration } from '@common/utils'
import { DATE_FORMAT_DAY, dayNames } from '@common/constants'
import { HomeStackParamList, useTypedNavigation } from '@navigation/navigation-options'

import type { ITaskWithStatus } from '@common/types'
import { stylesWithTheme } from './daily-item.styles'

interface DailyItemProps {
  item: ITaskWithStatus
}

export const DailyItemComponent: FC<DailyItemProps> = ({ item }) => {
  const { styles } = useStylesWithThemeAndDimensions(stylesWithTheme)
  const { t } = useTranslation('components')

  const { navigate } = useTypedNavigation<HomeStackParamList>()

  return (
    <TouchableOpacity style={styles.main} onPress={() => navigate('TaskView', { id: item.id })}>
      <Text variant="bodyLarge" style={styles.dailyItemTitle}>
        {item.title}
      </Text>
      <Text numberOfLines={3} style={styles.dailyItemDescription}>
        {item.description}
      </Text>
      <View style={styles.dailyItemShortInfoContainer}>
        <Chip style={styles.chip}>
          <Text>
            {t('dailyItem.priority')}: {item.priority}
          </Text>
        </Chip>
        <Chip style={styles.chip}>
          <Text>Status: {item.status}</Text>
        </Chip>
        <Chip style={styles.chip}>
          <Text>Duration: {formatDuration(item.duration)}</Text>
        </Chip>
        <Chip style={styles.chip}>
          <Text>Break: {formatDuration(item.breakDuration)}</Text>
        </Chip>
        {item.dates?.map((date) => (
          <Chip key={`${date}`} style={styles.chip}>
            <Text>{dayjs(date).format(DATE_FORMAT_DAY)}</Text>
          </Chip>
        ))}
        {item.weekly?.map((day) => (
          <Chip key={`${day}`} style={styles.chip}>
            <Text>{dayNames[day]}</Text>
          </Chip>
        ))}
      </View>
    </TouchableOpacity>
  )
}
