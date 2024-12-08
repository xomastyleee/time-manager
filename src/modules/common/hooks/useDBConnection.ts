import { useEffect } from 'react'
import { DataSource } from 'typeorm'
import { DayPlan, Goal, User, Notification, Task } from "@db/entities";

const resolvePath = (...segments: string[]) => segments.join('/')
export const dataSource = new DataSource({
  type: 'react-native',
  database: 'test',
  location: 'default',
  logging: ['error', 'query', 'schema'],
  entities: [User, DayPlan , Goal, Notification, Task],
  synchronize: true
})

export const useDBConnection = () => {
  useEffect(() => {
    dataSource.initialize().then(() => {
      console.log('DataSource has been initialized!');
    }).catch((err) => {
      console.error('Error during DataSource initialization:', err);
    });
  }, [])

  return dataSource
}
