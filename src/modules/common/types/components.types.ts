import dayjs from 'dayjs'

import { DailyMode } from '../constants/general.const'
import { ITask } from './main.types'
import { ITasksByWeeks } from './task.types'

export interface DailyProps {
  dailyMode: DailyMode
  currentDate: dayjs.Dayjs
  onDateChange: (newDate: dayjs.Dayjs) => void
  onDailyModeChange: (mode: DailyMode) => void
}

export interface DailyHeaderProps extends DailyProps {
  isCurrentDate: boolean
}

export interface DailyViewProps extends DailyProps {
  userTasks: ITask[]
  userTasksByWeeks: ITasksByWeeks
  isLoading: boolean
}
