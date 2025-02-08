import { DataSource } from 'typeorm'
import { DayPlan, Goal, Notification, Task, User } from '@common/db/entities'

import { UpdatePreferencesUserTable1707420000000 } from '../../../../migrations'

export const dataSource = new DataSource({
  type: 'react-native',
  database: 'test',
  location: 'default',
  migrations: [UpdatePreferencesUserTable1707420000000],
  logging: ['error', 'query', 'schema'],
  entities: [User, DayPlan, Goal, Notification, Task],
  synchronize: false
})
