import { DataSource } from 'typeorm'
import { DayPlan, Goal, Notification, Task, User } from '@common/db/entities'

export const dataSource = new DataSource({
  type: 'react-native',
  database: 'test',
  location: 'default',
  migrations: ['src/migrations/**/*.ts'],
  logging: ['error', 'query', 'schema'],
  entities: [User, DayPlan, Goal, Notification, Task],
  synchronize: false
})
