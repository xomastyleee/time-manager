import { StyleSheet } from 'react-native'
import { type CreateStylesProps } from '@common/hooks'

export const stylesWithTheme = ({ theme: { colors } }: CreateStylesProps) =>
  StyleSheet.create({
    calendarModeSwitch: {
      alignContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.onBackground,
      borderRadius: 20,
      flexDirection: 'row',
      height: 30,
      justifyContent: 'space-between',
      position: 'absolute',
      right: 10,
      top: 15,
      width: 60
    },
    container: {
      alignItems: 'center',
      height: 60,
      justifyContent: 'center',
      position: 'relative',
      width: '100%'
    },
    dailyBadge: {
      alignItems: 'center',
      backgroundColor: colors.onScreenContent,
      borderRadius: 20,
      flexDirection: 'row',
      height: 30,
      justifyContent: 'space-between',
      position: 'relative',
      width: 200
    },
    setToCurrentDateButton: {
      alignItems: 'center',
      backgroundColor: colors.onScreenContent,
      borderRadius: 20,
      height: 30,
      justifyContent: 'center',
      padding: 0,
      width: '100%'
    },
    setToCurrentDateButtonWrapper: {
      alignItems: 'center',
      bottom: -35,
      height: 30,
      justifyContent: 'center',
      left: 50,
      position: 'absolute',
      width: 100
    },
    switchText: {
      textAlign: 'center',
      width: 30,
      zIndex: 1
    },
    toggle: {
      backgroundColor: colors.onScreenContent,
      borderRadius: '50%',
      height: 30,
      position: 'absolute',
      width: 30
    }
  })
