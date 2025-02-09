import { DataSource } from 'typeorm'
import { DayPlan, Goal, Notification, Task, User } from '@common/db/entities'

export const dataSource = new DataSource({
  type: 'react-native',
  database: 'test',
  location: 'default',
  // migrations: [UpdatePreferencesUserTable1707420000000], <- this set list migrations
  logging: ['error', 'query', 'schema'],
  entities: [User, DayPlan, Goal, Notification, Task],
  synchronize: true // <- dev mod [true]
})
