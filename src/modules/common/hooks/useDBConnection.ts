import { useEffect } from 'react'
import { DataSource } from 'typeorm'

const dataSource = new DataSource({
  type: 'react-native',
  database: 'test',
  location: 'default',
  logging: ['error', 'query', 'schema'],
  entities: [`${__dirname}/../../../app/db/entities/*.entity{.ts,.tsx}`],
  synchronize: true
})

export const useDBConnection = () => {
  useEffect(() => {
    dataSource.initialize()
  }, [])

  return dataSource
}
