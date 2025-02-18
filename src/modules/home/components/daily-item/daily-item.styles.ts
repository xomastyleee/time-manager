import { StyleSheet } from 'react-native'
import { type CreateStylesProps } from '@common/hooks'

export const stylesWithTheme = ({ theme: { colors } }: CreateStylesProps) =>
  StyleSheet.create({
    animatedContainer: {
      overflow: 'hidden',
      width: '100%'
    },
    currentDay: {
      backgroundColor: colors.primary
    },
    currentDayText: {
      fontWeight: 'bold'
    },
    main: {
      backgroundColor: colors.onScreenContent,
      borderRadius: 20,
      marginVertical: 10,
      minHeight: 100,
      padding: 10,
      width: '100%'
    },
    taskContainer: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      width: '100%'
    },
    taskNavigationButton: {
      alignItems: 'center',
      backgroundColor: colors.onScreenContent,
      borderRadius: 10,
      height: 40,
      justifyContent: 'center',
      marginVertical: 5,
      width: '100%'
    },
    weekItem: {
      alignItems: 'center',
      justifyContent: 'center',
      maxHeight: 400,
      minHeight: 60
    }
  })
