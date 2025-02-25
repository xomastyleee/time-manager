import { DataSource } from 'typeorm'
import { HistoryTask, Task, User } from '@common/db/entities'

export const dataSource = new DataSource({
  type: 'react-native',
  database: 'test',
  location: 'default',
  // migrations: [UpdatePreferencesUserTable1707420000000], <- this set list migrations
  logging: ['error', 'query', 'schema'],
  entities: [User, HistoryTask, Task],
  // dropSchema: __DEV__, // <- dev mod [true] Full Rebuild
  // synchronize: __DEV__ // <- dev mod [true] rebuild
  synchronize: false
})
