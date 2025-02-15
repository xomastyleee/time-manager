import React, { FC } from 'react'
import { TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import { useStylesWithThemeAndDimensions } from '@modules/common/hooks'

import type { ITask } from '@modules/common/types'
import { stylesWithTheme } from './daily-item.styles'

interface DailyItemProps {
  item: ITask
}

export const DailyItemComponent: FC<DailyItemProps> = ({ item: { title, priority } }) => {
  const { styles } = useStylesWithThemeAndDimensions(stylesWithTheme)

  return (
    <TouchableOpacity style={styles.main} onPress={() => null}>
      <Text>{title}</Text>
      <Text>Priority: {priority}</Text>
    </TouchableOpacity>
  )
}
