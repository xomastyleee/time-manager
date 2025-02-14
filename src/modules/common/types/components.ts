import dayjs from 'dayjs'

import { DailyMode } from '../constants/general.const'
import type { ITask, ITasksByWeeks } from './data-interfaces'

export interface DailyProps {
  dailyMode: DailyMode
  currentDate: dayjs.Dayjs
}

export interface DailyHeaderProps extends DailyProps {
  isCurrentDate: boolean
  onDateChange: (newDate: dayjs.Dayjs) => void
  onDailyModeChange: (mode: DailyMode) => void
}

export interface DailyViewProps extends DailyProps {
  userTasks: ITask[]
  userTasksByWeeks: ITasksByWeeks
  isLoading: boolean
}
