import React, { FC } from 'react'
import { View } from 'react-native'
import { Card, Chip, Text } from 'react-native-paper'
import { useStylesWithThemeAndDimensions } from '@modules/common/hooks'

import type { ITask } from '@modules/common/types'
import { stylesWithTheme } from './daily-item.styles'

interface DailyItemProps {
  item: ITask
}

export const DailyItemComponent: FC<DailyItemProps> = ({ item: { title, priority, description, type, status } }) => {
  const { styles } = useStylesWithThemeAndDimensions(stylesWithTheme)

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.row}>
          <Chip style={styles.chip}>{priority}</Chip>
          <Chip style={styles.chip}>{type}</Chip>
          <Chip style={styles.chip}>{status}</Chip>
        </View>
        <Text style={styles.description}>{description}</Text>
      </Card.Content>
    </Card>
  )
}
