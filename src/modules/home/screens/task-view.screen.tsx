import React, { useEffect, useState, useMemo } from 'react'
import { StyleSheet } from 'react-native'
import { ContentView, ITask, ScreenView, TaskDetails, Timer } from '@common/components'
import { type CreateStylesProps, useStylesWithThemeAndDimensions } from '@common/hooks'
import { useRoute, RouteProp } from '@react-navigation/native'
import { taskService } from '@modules/common/services'
import { historyTaskService } from '@modules/common/services/historyTask.service'
import { IHistoryTask, IStatisticTask, TaskStatus } from '@modules/common/types'

type TaskViewRouteParams = {
  TaskView: { id: string }
}

const taskStatusToButtonName: Record<TaskStatus, string> = {
  [TaskStatus.Planned]: 'Start Task',
  [TaskStatus.Paused]: 'Start Task',
  [TaskStatus.InProgress]: 'Complete Task',
  [TaskStatus.Completed]: 'View Summary',
  [TaskStatus.Failed]: 'Retry Task'
}

export const TaskViewScreen = () => {
  const { styles } = useStylesWithThemeAndDimensions(stylesWithTheme)

  const [task, setTask] = useState<ITask | null>(null)
  const [history, setHistory] = useState<IHistoryTask[]>([])
  const [statistic, setStatistic] = useState<IStatisticTask | null>(null)

  const route = useRoute<RouteProp<TaskViewRouteParams, 'TaskView'>>()
  const taskId = task?.id

  const lastHistoryItem = useMemo(() => history.at(-1), [history])
  const lastHistoryItemStatus = lastHistoryItem?.status

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [taskData, historyData] = await Promise.all([
          taskService.getTaskById(Number(route.params.id)),
          historyTaskService.getHistoryTasksById(Number(route.params.id))
        ])

        if (taskData && historyData) {
          const statisticData = await historyTaskService.calculateWorkTask(historyData)

          setTask(taskData)
          setHistory(historyData)
          setStatistic(statisticData)
        }
      } catch (error) {
        console.error('Error fetching task data:', error)
      }
    }

    fetchData()
  }, [route.params.id])

  const onSubmit = async () => {
    if (!taskId || lastHistoryItemStatus !== TaskStatus.Planned) return

    try {
      await taskService.updateTask(taskId, { status: TaskStatus.InProgress })
      const updatedTask = await taskService.getTaskById(taskId)
      if (updatedTask) setTask(updatedTask)
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  const submitButtonLabel = lastHistoryItemStatus ? taskStatusToButtonName[lastHistoryItemStatus] : 'Start Task'

  return (
    <ScreenView>
      <ContentView style={styles.main}>
        <Timer
          time="12:30"
          isRunning={false}
          onStartPause={() => console.log('onStartPause')}
          onReset={() => console.log('onReset')}
        />
        {task && <TaskDetails task={task} submitButtonLabel={submitButtonLabel} onSubmit={onSubmit} />}
      </ContentView>
    </ScreenView>
  )
}

const stylesWithTheme = ({ dimensions: { height } }: CreateStylesProps) =>
  StyleSheet.create({
    main: {}
  })
