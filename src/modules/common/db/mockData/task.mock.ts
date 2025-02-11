import { DayWeek, ITaskCreateParams, Priority, TaskStatus, TaskType } from '@common/types'

export const TASK_MOCK: ITaskCreateParams[] = [
  {
    title: 'Complete project documentation',
    priority: Priority.A,
    type: TaskType.Work,
    weekly: [DayWeek.Monday, DayWeek.Wednesday, DayWeek.Friday],
    dates: [new Date('2024-02-12'), new Date('2024-02-14')],
    status: TaskStatus.Active,
    startDate: new Date('2024-02-12T09:00:00'),
    endDate: new Date('2024-02-12T11:00:00'),
    description: 'Write detailed documentation for the project',
    duration: 120,
    breakDuration: 15
  },
  {
    title: 'Morning meditation',
    priority: Priority.C,
    type: TaskType.Rest,
    weekly: [DayWeek.Sunday, DayWeek.Tuesday, DayWeek.Thursday],
    dates: [new Date('2024-02-13'), new Date('2024-02-15')],
    status: TaskStatus.Pending,
    startDate: new Date('2024-02-13T07:00:00'),
    endDate: new Date('2024-02-13T07:30:00'),
    description: 'Relax and clear the mind',
    duration: 30,
    breakDuration: 5
  },
  {
    title: 'Attend online coding bootcamp',
    priority: Priority.B,
    type: TaskType.SelfDevelopment,
    weekly: [DayWeek.Monday, DayWeek.Wednesday, DayWeek.Friday],
    dates: [new Date('2024-02-12'), new Date('2024-02-14')],
    status: TaskStatus.Active,
    startDate: new Date('2024-02-12T18:00:00'),
    endDate: new Date('2024-02-12T20:00:00'),
    description: 'Learn full-stack development',
    duration: 120,
    breakDuration: 10
  },
  {
    title: 'Weekly business meeting',
    priority: Priority.A,
    type: TaskType.Work,
    weekly: [DayWeek.Wednesday],
    dates: [new Date('2024-02-14')],
    status: TaskStatus.Completed,
    startDate: new Date('2024-02-14T10:00:00'),
    endDate: new Date('2024-02-14T11:30:00'),
    description: 'Discuss company strategy',
    duration: 90,
    breakDuration: 10
  },
  {
    title: 'Read self-improvement book',
    priority: Priority.D,
    type: TaskType.SelfDevelopment,
    weekly: [DayWeek.Saturday, DayWeek.Sunday],
    dates: [new Date('2024-02-17'), new Date('2024-02-18')],
    status: TaskStatus.Pending,
    startDate: new Date('2024-02-17T20:00:00'),
    endDate: new Date('2024-02-17T21:30:00'),
    description: 'Read "Atomic Habits"',
    duration: 90,
    breakDuration: 10
  }
]
