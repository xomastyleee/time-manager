import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { useForm, SubmitHandler } from 'react-hook-form'
import dayjs from 'dayjs'
import { ContentView, ScreenView, Timer, useUser } from '@common/components'
import { type CreateStylesProps, useStylesWithThemeAndDimensions } from '@common/hooks'
import { HomeStackParamList, RouteParams, useTypedNavigation } from '@navigation/navigation-options'
import { ITask, TaskStatus } from '@common/types'
import { taskService } from '@common/services'

import { TaskDetails } from '../components'

export const TaskViewScreen = ({
  route: {
    params: { id }
  }
}: RouteParams<HomeStackParamList['TaskView']>) => {
  const { styles } = useStylesWithThemeAndDimensions(stylesWithTheme)

  const { user } = useUser()

  const navigation = useTypedNavigation<HomeStackParamList>()

  const [isPauseTimer, setIsPauseTimer] = useState(false)
  const [isTaskStarted, setIsTaskStarted] = useState(false)

  const { handleSubmit, watch, setValue, reset } = useForm<{ task: ITask }>({
    mode: 'onChange'
  })

  const updatedTask = watch('task')

  const onSubmit: SubmitHandler<{ task: ITask }> = async (data) => {
    if (!user) return

    try {
      await taskService.updateTask(data.task.id, { ...data.task, user })
      navigation.navigate('HomeScreen')
    } catch (error) {
      // Handle error (e.g., show an error message)
    }
  }

  const expiryTimestampOnTask = dayjs()
    .add(updatedTask.duration || 0, 'second')
    .toDate()
  const expiryTimestampOnPause = dayjs()
    .add(updatedTask.breakDuration || 0, 'second')
    .toDate()

  const onStart = (newDuration: number) => {
    setIsTaskStarted(true)
    setIsPauseTimer(false)
    setValue('task', { ...updatedTask, status: TaskStatus.InProgress, duration: newDuration })
    handleSubmit(onSubmit)()
  }
  const onPause = (newDuration: number) => {
    setIsPauseTimer(true)
    setIsTaskStarted(false)
    setValue('task', { ...updatedTask, status: TaskStatus.Paused, breakDuration: newDuration })
    handleSubmit(onSubmit)()
  }
  const onStop = ({ duration, breakDuration }: { duration: number; breakDuration: number }) => {
    setIsTaskStarted(false)
    setIsPauseTimer(false)
    setValue('task', { ...updatedTask, status: TaskStatus.Completed, duration, breakDuration })
    handleSubmit(onSubmit)()
  }

  useEffect(
    () =>
      navigation.addListener('beforeRemove', () => {
        setValue('task', { ...updatedTask, status: TaskStatus.Completed })
        handleSubmit(onSubmit)()
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <ScreenView>
      <ContentView style={styles.main}>
        <Timer
          expiryTimestampOnTask={expiryTimestampOnTask}
          expiryTimestampOnPause={expiryTimestampOnPause}
          isTaskStarted={isTaskStarted}
          isPauseTimer={isPauseTimer}
          onStart={onStart}
          onPause={onPause}
          onStop={onStop}
        />
        {updatedTask && <TaskDetails task={updatedTask} submitButtonLabel="Update" onSubmit={handleSubmit(onSubmit)} />}
      </ContentView>
    </ScreenView>
  )
}

const stylesWithTheme = (_: CreateStylesProps) =>
  StyleSheet.create({
    main: {
      flex: 1
    }
  })
