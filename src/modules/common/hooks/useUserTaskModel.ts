import { useCallback, useMemo, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import dayjs from 'dayjs'

import { DayWeekMap, type ITask, type ITasksByWeeks, type WeekDayCodes } from '../types'
import { taskService } from '../services'
import { DailyMode } from '../constants'
import { useUser } from '../components'
import { logger } from '../utils'

interface UserTaskProps {
  dailyMode: DailyMode
  currentDate: dayjs.Dayjs
}

interface GetUserTaskProps extends UserTaskProps {
  userId: number
  setUserTasks: (tasks: ITask[]) => void
  setUserTasksByWeeks: (weeks: ITasksByWeeks) => void
}

const initialUserTasksByWeeks = Object.keys(DayWeekMap).reduce((acc, key) => {
  const day = Number(key) as WeekDayCodes
  acc[day] = []
  return acc
}, {} as ITasksByWeeks)

const getUserTasks = async ({
  userId,
  dailyMode,
  currentDate,
  setUserTasks,
  setUserTasksByWeeks
}: GetUserTaskProps) => {
  const tasks = await taskService.getUserTaskForCurrentDate({ userId, dailyMode, currentDate })

  if (dailyMode === DailyMode.WEEK) {
    const tasksByWeeks = Object.keys(DayWeekMap).reduce((acc, key) => {
      const day = Number(key) as WeekDayCodes
      acc[day] = []
      return acc
    }, {} as ITasksByWeeks)

    tasks.map((task) => {
      task?.dates?.map((date) => {
        const day = dayjs(date).day()
        tasksByWeeks[day] = [...tasksByWeeks[day], task]
      })
    })

    setUserTasks([])
    setUserTasksByWeeks(tasksByWeeks)
  } else {
    setUserTasks(tasks)
    setUserTasksByWeeks(initialUserTasksByWeeks)
  }
}

export const useUserTaskModel = ({ dailyMode, currentDate }: UserTaskProps) => {
  const { user } = useUser()

  const [userTasks, setUserTasks] = useState<ITask[]>([])
  const [userTasksByWeeks, setUserTasksByWeeks] = useState<ITasksByWeeks>(initialUserTasksByWeeks)
  const [isLoading, setIsLoading] = useState(false)

  useFocusEffect(
    useCallback(() => {
      if (user) {
        setIsLoading(true)
        getUserTasks({ userId: user.id, dailyMode, currentDate, setUserTasks, setUserTasksByWeeks })
          .catch(logger.error)
          .finally(() => {
            setIsLoading(false)
          })
      }
    }, [currentDate, dailyMode, user])
  )

  return useMemo(() => ({ userTasks, userTasksByWeeks, isLoading }), [userTasks, userTasksByWeeks, isLoading])
}
