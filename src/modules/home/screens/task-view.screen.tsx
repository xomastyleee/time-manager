import React from 'react'
import { StyleSheet } from 'react-native'
import { useForm, SubmitHandler } from 'react-hook-form'
import { ContentView, ScreenView, TaskDetails, Timer } from '@common/components'
import { type CreateStylesProps, useStylesWithThemeAndDimensions } from '@common/hooks'
import { HomeStackParamList, RouteParams } from '@navigation/navigation-options'
import { ITaskWithStatus, TaskStatus } from '@common/types'

const taskStatusToButtonName: Record<TaskStatus, string> = {
  [TaskStatus.Planned]: 'Start Task',
  [TaskStatus.Paused]: 'Start Task',
  [TaskStatus.InProgress]: 'Complete Task',
  [TaskStatus.Completed]: 'View Summary',
  [TaskStatus.Failed]: 'Retry Task'
}

export const TaskViewScreen = ({
  route: {
    params: { task }
  }
}: RouteParams<HomeStackParamList['TaskView']>) => {
  const { styles } = useStylesWithThemeAndDimensions(stylesWithTheme)

  const { handleSubmit, watch } = useForm<{ task: ITaskWithStatus }>({
    mode: 'onChange',
    defaultValues: { task }
  })

  const updatedTask = watch('task')

  // const lastHistoryItem = useMemo(() => history.at(-1), [history])
  // const lastHistoryItemStatus = lastHistoryItem?.status

  const onSubmit: SubmitHandler<{ task: ITaskWithStatus }> = async (data) => {
    try {
      // handle update task
    } catch (error) {
      // Handle error (e.g., show an error message)
    }
  }

  const submitButtonLabel = 'Start Task'

  return (
    <ScreenView>
      <ContentView style={styles.main}>
        <Timer
          time="12:30"
          isRunning={false}
          onStartPause={() => console.log('onStartPause')}
          onReset={() => console.log('onReset')}
        />
        {updatedTask && (
          <TaskDetails task={updatedTask} submitButtonLabel={submitButtonLabel} onSubmit={handleSubmit(onSubmit)} />
        )}
      </ContentView>
    </ScreenView>
  )
}

const stylesWithTheme = (_: CreateStylesProps) =>
  StyleSheet.create({
    main: {}
  })
