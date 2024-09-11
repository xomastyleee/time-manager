import { enablePromise, openDatabase } from 'react-native-sqlite-storage'

enablePromise(true)

export const connectToMainDatabase = async () =>
  openDatabase(
    { name: 'timeManager.db', location: 'default' },
    () => {},
    (error) => {
      console.error(error)
    }
  )
