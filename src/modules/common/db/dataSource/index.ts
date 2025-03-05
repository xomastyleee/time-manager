import { DataSource } from 'typeorm'
import Config from 'react-native-config'
import { HistoryTask, Task, TaskType, User } from '@common/db/entities'

const isDev = Config.VARIANT === 'development'

export const dataSource = new DataSource({
  type: 'react-native',
  database: isDev ? 'frog-time-dev.db' : 'frog-time.db',
  location: 'default',
  // migrations: [UpdatePreferencesUserTable1707420000000], <- this set list migrations
  logging: ['error', 'query', 'schema'],
  entities: [User, HistoryTask, Task, TaskType],
  dropSchema: isDev ? __DEV__ : false, // <- dev mod [true] Full Rebuild
  synchronize: isDev ? __DEV__ : false // <- dev mod [true] rebuild
})
