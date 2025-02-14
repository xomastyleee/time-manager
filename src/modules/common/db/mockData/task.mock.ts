import { DayWeek, ITaskCreateUpdateParams, Priority, TaskStatus, TaskType } from '@common/types'

export const TASK_MOCK: ITaskCreateUpdateParams[] = [
  {
    title: 'Complete project documentation',
    priority: Priority.A,
    type: TaskType.Work,
    weekly: [DayWeek.Monday, DayWeek.Wednesday, DayWeek.Friday],
    dates: [new Date('2025-02-17'), new Date('2025-02-19')],
    status: TaskStatus.Planned,
    description: 'Write detailed documentation for the project',
    duration: 7200000, // 2 hours
    breakDuration: 900000 // 15 minutes
  },
  {
    title: 'Morning meditation',
    priority: Priority.C,
    type: TaskType.Rest,
    weekly: [DayWeek.Sunday, DayWeek.Tuesday, DayWeek.Thursday],
    dates: [new Date('2025-02-18'), new Date('2025-02-20')],
    status: TaskStatus.Planned,
    description: 'Relax and clear the mind',
    duration: 1800000, // 30 minutes
    breakDuration: 300000 // 5 minutes
  },
  {
    title: 'Attend online coding bootcamp',
    priority: Priority.B,
    type: TaskType.SelfDevelopment,
    weekly: [DayWeek.Monday, DayWeek.Wednesday, DayWeek.Friday],
    dates: [new Date('2025-02-17'), new Date('2025-02-19')],
    status: TaskStatus.Planned,
    description: 'Learn full-stack development',
    duration: 7200000, // 2 hours
    breakDuration: 600000 // 10 minutes
  },
  {
    title: 'Weekly business meeting',
    priority: Priority.A,
    type: TaskType.Work,
    weekly: [DayWeek.Wednesday],
    dates: [new Date('2025-02-19')],
    status: TaskStatus.Planned,
    description: 'Discuss company strategy',
    duration: 5400000, // 1.5 hours
    breakDuration: 600000 // 10 minutes
  },
  {
    title: 'Read self-improvement book',
    priority: Priority.D,
    type: TaskType.SelfDevelopment,
    weekly: [DayWeek.Saturday, DayWeek.Sunday],
    status: TaskStatus.Planned,
    dates: [new Date('2025-02-22'), new Date('2025-02-23')],
    description: 'Read "Atomic Habits"',
    duration: 5400000, // 1.5 hours
    breakDuration: 600000 // 10 minutes
  },
  {
    title: 'Yoga session',
    priority: Priority.B,
    type: TaskType.Rest,
    weekly: [DayWeek.Monday, DayWeek.Wednesday],
    status: TaskStatus.Planned,
    description: 'Morning yoga to start the day',
    duration: 3600000, // 1 hour
    breakDuration: 600000 // 10 minutes
  },
  {
    title: 'Client follow-up calls',
    priority: Priority.A,
    type: TaskType.Work,
    status: TaskStatus.Planned,
    dates: [new Date('2025-02-24'), new Date('2025-02-26')],
    description: 'Follow up with clients on project progress',
    duration: 1800000, // 30 minutes
    breakDuration: 300000 // 5 minutes
  },
  {
    title: 'Grocery shopping',
    priority: Priority.C,
    type: TaskType.Rest,
    status: TaskStatus.Planned,
    weekly: [DayWeek.Saturday],
    description: 'Weekly grocery shopping',
    duration: 7200000, // 2 hours
    breakDuration: 900000 // 15 minutes
  },
  {
    title: 'Team brainstorming session',
    priority: Priority.A,
    type: TaskType.Work,
    status: TaskStatus.Planned,
    dates: [new Date('2025-02-25')],
    description: 'Brainstorming session for new project ideas',
    duration: 14400000, // 4 hours
    breakDuration: 1800000 // 30 minutes
  },
  {
    title: 'Evening walk',
    priority: Priority.D,
    type: TaskType.Rest,
    status: TaskStatus.Planned,
    weekly: [DayWeek.Tuesday, DayWeek.Thursday],
    description: 'Relaxing evening walk',
    duration: 2700000, // 45 minutes
    breakDuration: 0 // no break
  },
  {
    title: 'Code review',
    priority: Priority.A,
    type: TaskType.Work,
    status: TaskStatus.Planned,
    weekly: [DayWeek.Tuesday, DayWeek.Thursday],
    dates: [new Date('2025-02-18'), new Date('2025-02-20')],
    description: 'Review code for the new feature',
    duration: 5400000, // 1.5 hours
    breakDuration: 600000 // 10 minutes
  },
  {
    title: 'Gym workout',
    priority: Priority.B,
    type: TaskType.Rest,
    status: TaskStatus.Planned,
    weekly: [DayWeek.Monday, DayWeek.Wednesday, DayWeek.Friday],
    description: 'Strength training and cardio',
    duration: 7200000, // 2 hours
    breakDuration: 900000 // 15 minutes
  },
  {
    title: 'Project planning',
    priority: Priority.A,
    type: TaskType.Work,
    status: TaskStatus.Planned,
    dates: [new Date('2025-02-17'), new Date('2025-02-19')],
    description: 'Plan the next sprint tasks',
    duration: 10800000, // 3 hours
    breakDuration: 1200000 // 20 minutes
  },
  {
    title: 'Cooking class',
    priority: Priority.C,
    type: TaskType.SelfDevelopment,
    status: TaskStatus.Planned,
    weekly: [DayWeek.Saturday],
    description: 'Learn to cook new recipes',
    duration: 14400000, // 4 hours
    breakDuration: 1800000 // 30 minutes
  },
  {
    title: 'Networking event',
    priority: Priority.B,
    status: TaskStatus.Planned,
    type: TaskType.Work,
    dates: [new Date('2025-02-21')],
    description: 'Meet professionals in the industry',
    duration: 7200000, // 2 hours
    breakDuration: 900000 // 15 minutes
  },
  {
    title: 'Language learning',
    priority: Priority.D,
    type: TaskType.SelfDevelopment,
    weekly: [DayWeek.Tuesday, DayWeek.Thursday],
    description: 'Practice speaking a new language',
    duration: 3600000, // 1 hour
    breakDuration: 600000 // 10 minutes
  },
  {
    title: 'Gardening',
    priority: Priority.C,
    type: TaskType.Rest,
    weekly: [DayWeek.Sunday],
    description: 'Tend to the garden',
    duration: 5400000, // 1.5 hours
    breakDuration: 600000 // 10 minutes
  },
  {
    title: 'Online course',
    priority: Priority.B,
    type: TaskType.SelfDevelopment,
    dates: [new Date('2025-02-22'), new Date('2025-02-23')],
    description: 'Complete modules of an online course',
    duration: 10800000, // 3 hours
    breakDuration: 1200000 // 20 minutes
  },
  {
    title: 'Family dinner',
    priority: Priority.D,
    type: TaskType.Work,
    weekly: [DayWeek.Friday],
    description: 'Have dinner with family',
    duration: 7200000, // 2 hours
    breakDuration: 900000 // 15 minutes
  },
  {
    title: 'Volunteer work',
    priority: Priority.C,
    type: TaskType.Rest,
    dates: [new Date('2025-02-24')],
    description: 'Help at the local community center',
    duration: 14400000, // 4 hours
    breakDuration: 1800000 // 30 minutes
  }
]
