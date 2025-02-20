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
        (task.weekly?.includes(DayWeekMap[currentDate.day()]) &&
          dayjs(task.createdAt).isSameOrBefore(currentDate, 'day'))
      )
    }

    if (dailyMode === DailyMode.WEEK) {
      const weekStart = currentDate.startOf('week')
      const weekEnd = currentDate.endOf('week')
      return (
        task.dates?.some((date) => dayjs(date).isBetween(weekStart, weekEnd, 'day', '[]')) ||
        (task.weekly && task.weekly?.length > 0 && dayjs(task.createdAt).isSameOrBefore(weekEnd, 'day'))
      )
    }

    return false
  })

  const populatedTasksWithHistory = await Promise.all(
    filteredTasks.map(async (task) => {
      const history = await historyTaskService.getByIdTaskHistoryRange({
        taskId: task.id,
        date: currentDate.toDate()
      })
      const isPastTask = dayjs(task.createdAt).isSameOrAfter(currentDate, 'day')
      const isTodayOrFuture = dayjs(currentDate).isSameOrAfter(dayjs(), 'day')

      let status = TaskStatus.Planned
      let { duration } = task
      let { breakDuration } = task

      if (history?.allHistoryByDate && history?.allHistoryByDate.length > 0) {
        const { pauseTime, workTime } = await historyTaskService.calculateWorkTask(history?.allHistoryByDate ?? [])
        status = history.lastHistoryByDate.status
        duration = (duration ?? 0) - workTime
        breakDuration = (breakDuration ?? 0) - pauseTime
      }

      if (
        isPastTask &&
        !isTodayOrFuture &&
        (status === TaskStatus.InProgress || status === TaskStatus.Planned || status === TaskStatus.Paused)
      ) {
        status = TaskStatus.Failed
      }

      return { ...task, status, duration, breakDuration }
    })
  )

  const validTasks = populatedTasksWithHistory.filter((task) => task !== null)

  const sortedTasks = validTasks.sort((a, b) => a.priority.localeCompare(b.priority))

  if (dailyMode === DailyMode.WEEK) {
    const tasksByWeeks = Object.keys(DayWeekMap).reduce((acc, key) => {
      const day = Number(key) as WeekDayCodes
      acc[day] = []
      return acc
    }, {} as ITasksByWeeks)

    sortedTasks.map((task) => {
      task?.weekly?.map((day) => {
        tasksByWeeks[day as WeekDayCodes] = [...tasksByWeeks[day as WeekDayCodes], task]
      })
      task?.dates?.map((date) => {
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
