import { Platform, Dimensions } from 'react-native'

export const isIos = Platform?.OS === 'ios'
export const isAndroid = Platform?.OS === 'android'
export const isLandscape = Dimensions.get('window').width > Dimensions.get('window').height

export enum DailyMode {
  WEEK = 'WEEK',
  DAY = 'DAY'
}
