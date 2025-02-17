import { StyleSheet } from 'react-native'

export const stylesWithTheme = () =>
  StyleSheet.create({
    animatedContainer: {
      overflow: 'hidden',
      width: '100%'
    },
    currentDayText: {
      fontWeight: 'bold'
    },
    taskContainer: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      width: '100%'
    },
    weekItem: {
      alignItems: 'center',
      justifyContent: 'center',
      maxHeight: 400,
      minHeight: 60
    }
  })
