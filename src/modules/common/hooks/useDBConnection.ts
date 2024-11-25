import { useEffect } from 'react'
import { DataSource } from 'typeorm'

const resolvePath = (...segments: string[]) => segments.join('/')

const dataSource = new DataSource({
  type: 'react-native',
  database: 'test',
  location: 'default',
  logging: ['error', 'query', 'schema'],
  entities: [resolvePath('..', '..', '..', 'src', 'app', 'db', 'entities', '*.entity{.ts,.tsx}')],
  synchronize: true
})

export const useDBConnection = () => {
  useEffect(() => {
    dataSource.initialize()
  }, [])

  return dataSource
}
