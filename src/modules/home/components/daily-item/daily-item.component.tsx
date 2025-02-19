import React, { FC } from 'react'
import { TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import { useStylesWithThemeAndDimensions } from '@modules/common/hooks'
import { HomeStackParamList, useTypedNavigation } from '@navigation/navigation-options'

import type { ITaskWithStatus } from '@modules/common/types'
import { stylesWithTheme } from './daily-item.styles'

interface DailyItemProps {
  item: ITaskWithStatus
}

export const DailyItemComponent: FC<DailyItemProps> = ({ item: { id, title, priority, status } }) => {
  const { styles } = useStylesWithThemeAndDimensions(stylesWithTheme)
  const { t } = useTranslation('components')

  const { navigate } = useTypedNavigation<HomeStackParamList>()

  return (
    <TouchableOpacity style={styles.main} onPress={() => navigate('TaskView', { id })}>
      <Text>{title}</Text>
      <Text>
        {t('dailyItem.priority')}: {priority}
      </Text>
      <Text>{status}</Text>
    </TouchableOpacity>
  )
}
