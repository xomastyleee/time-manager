export enum Priority {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  F = 'F',
  G = 'G',
  H = 'H',
  I = 'I',
  J = 'J',
  K = 'K',
  L = 'L',
  M = 'M',
  N = 'N',
  O = 'O',
  P = 'P',
  Q = 'Q',
  R = 'R',
  S = 'S',
  T = 'T',
  U = 'U',
  V = 'V',
  W = 'W',
  X = 'X',
  Y = 'Y',
  Z = 'Z'
}

export enum DayWeek {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6
}

export const DayWeekMap = {
  [DayWeek.Sunday]: 0,
  [DayWeek.Monday]: 1,
  [DayWeek.Tuesday]: 2,
  [DayWeek.Wednesday]: 3,
  [DayWeek.Thursday]: 4,
  [DayWeek.Friday]: 5,
  [DayWeek.Saturday]: 6
}

export enum UserStatus {
  Active = 'Active',
  Inactive = 'Inactive'
}
export enum TaskStatus {
  Planned = 'Planned',
  InProgress = 'InProgress',
  Paused = 'Paused',
  Completed = 'Completed',
  Failed = 'Failed'
}
