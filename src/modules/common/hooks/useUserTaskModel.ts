import { useCallback, useMemo, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import dayjs from 'dayjs'
import { historyTaskService } from '@common/services/historyTask.service'

import { DayWeekMap, ITask, type ITasksByWeeks, type ITaskWithStatus, TaskStatus, WeekDayCodes } from '../types'
import { userService } from '../services'
import { DailyMode } from '../constants'
import { useUser } from '../components'
import { logger } from '../utils'

interface UserTaskProps {
  dailyMode: DailyMode
  currentDate: dayjs.Dayjs
  createTaskCallback?: (props: { tasks?: ITask[]; tasksByWeeks?: ITasksByWeeks }) => void
}

interface GetUserTaskProps extends UserTaskProps {
  userId: number
  setUserTasks: (tasks: ITaskWithStatus[]) => void
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
  setUserTasksByWeeks,
  createTaskCallback = () => null
}: GetUserTaskProps) => {
  const user = await userService.getUserTasks(userId)
  const tasks = user?.tasks ?? []

  const filteredTasks = tasks.filter((task) => {
    if (dailyMode === DailyMode.DAY) {
      return (
        task.dates?.some((date) => dayjs(date).isSame(currentDate, 'day')) ||
        task.weekly?.includes(DayWeekMap[currentDate.day()])
      )
    }
    if (dailyMode === DailyMode.WEEK) {
      const weekStart = currentDate.startOf('week')
      const weekEnd = currentDate.endOf('week')
      return (
        task.dates?.some((date) => dayjs(date).isBetween(weekStart, weekEnd, 'day', '[]')) ||
        (task?.weekly && task?.weekly?.length > 0)
      )
    }
    return false
  })

  const populatedTasksWithStatus = await Promise.all(
    filteredTasks.map(async (task) => {
      const taskHistory = await historyTaskService.getByIdTaskHistoryRange({
        taskId: task.id,
        date: currentDate.toDate(),
        isLast: true
      })
      const status = taskHistory && taskHistory?.length > 0 ? taskHistory?.[0].status : TaskStatus.Planned
      return { ...task, status }
    })
  )

  const sortedTasks = populatedTasksWithStatus.sort((a, b) => a.priority.localeCompare(b.priority))

  if (dailyMode === DailyMode.WEEK) {
    const tasksByWeeks = Object.keys(DayWeekMap).reduce((acc, key) => {
      const day = Number(key) as WeekDayCodes
      acc[day] = []
      return acc
    }, {} as ITasksByWeeks)

    sortedTasks.map((task) => {
      task.weekly?.map((day) => {
        tasksByWeeks[day as WeekDayCodes] = [...tasksByWeeks[day as WeekDayCodes], task]
      })
      task.dates?.map((date) => {
        const day = dayjs(date).day()
        if (!task.weekly?.includes(day)) {
          tasksByWeeks[day] = [...tasksByWeeks[day], task]
        }
      })
    })

    setUserTasks([])
    setUserTasksByWeeks(tasksByWeeks)
    createTaskCallback({ tasksByWeeks })
  } else {
    setUserTasks(sortedTasks)
    setUserTasksByWeeks(initialUserTasksByWeeks)
    createTaskCallback({ tasks: sortedTasks })
  }
}

export const useUserTaskModel = ({ dailyMode, currentDate, createTaskCallback }: UserTaskProps) => {
  const { user } = useUser()

  const [userTasks, setUserTasks] = useState<ITaskWithStatus[]>([])
  const [userTasksByWeeks, setUserTasksByWeeks] = useState<ITasksByWeeks>(initialUserTasksByWeeks)
  const [isLoading, setIsLoading] = useState(false)

  useFocusEffect(
    useCallback(() => {
      if (user) {
        setIsLoading(true)
        getUserTasks({ userId: user.id, dailyMode, currentDate, setUserTasks, setUserTasksByWeeks, createTaskCallback })
          .catch(logger.error)
          .finally(() => {
            setIsLoading(false)
          })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentDate, dailyMode, user])
  )

  return useMemo(() => ({ userTasks, userTasksByWeeks, isLoading }), [userTasks, userTasksByWeeks, isLoading])
}
