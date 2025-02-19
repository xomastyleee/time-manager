import React, { FC } from 'react'
import { Text, Card, Divider } from 'react-native-paper'
import { useStylesWithThemeAndDimensions } from '@common/hooks'
import { View, Button } from 'react-native'

import { stylesWithTheme } from './task-details.styles'
import { formatDuration } from './utils'

export interface ITask {
  id: number
  title: string
  priority: string
  type: string
  weekly?: number[]
  dates?: Date[]
  description?: string
  duration?: number
  breakDuration?: number
}

interface TaskProps {
  task: ITask
  submitButtonLabel: string
  onSubmit: () => void
}

export const TaskDetails: FC<TaskProps> = ({ task, submitButtonLabel, onSubmit }) => {
  const { styles } = useStylesWithThemeAndDimensions(stylesWithTheme)

  return (
    <Card style={styles.card}>
      <Card.Title title={task.title} subtitle={`Priority: ${task.priority}`} />
      <Divider style={styles.divider} />
      <Card.Content>
        <View style={styles.row}>
          <Text style={styles.label}>Type:</Text>
          <Text style={styles.text}>{task.type}</Text>
        </View>
        {task.description && (
          <View style={styles.row}>
            <Text style={styles.label}>Description:</Text>
            <Text style={styles.text}>{task.description}</Text>
          </View>
        )}
        {!!task.duration && (
          <View style={styles.row}>
            <Text style={styles.label}>Duration:</Text>
            <Text style={styles.text}>{formatDuration(task.duration)}</Text>
          </View>
        )}
        {!!task.breakDuration !== undefined && (
          <View style={styles.row}>
            <Text style={styles.label}>Break:</Text>
            <Text style={styles.text}>{formatDuration(task.breakDuration)}</Text>
          </View>
        )}
        <Button title={submitButtonLabel} onPress={onSubmit} />
      </Card.Content>
    </Card>
  )
}
