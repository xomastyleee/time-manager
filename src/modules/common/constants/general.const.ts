import { Platform } from 'react-native'

export const isIos = Platform?.OS === 'ios'
export const isAndroid = Platform?.OS === 'android'

export enum DailyMode {
  WEEK = 'WEEK',
  DAY = 'DAY'
}
