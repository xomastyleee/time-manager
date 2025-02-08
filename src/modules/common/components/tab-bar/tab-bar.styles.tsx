import { StyleSheet } from 'react-native'
import { type AppTheme } from '@common/theme'

export const stylesWithTheme = (theme: AppTheme) =>
  StyleSheet.create({
    centerCutout: {
      alignSelf: 'center',
      backgroundColor: theme.colors.transparent,
      bottom: 0,
      height: 80,
      position: 'absolute',
      width: '16%'
    },
    fab: {
      alignSelf: 'center',
      backgroundColor: theme.colors.background,
      borderRadius: '50%',
      bottom: 0,
      position: 'absolute'
    },
    iconWrapper: {
      alignItems: 'center',
      flexDirection: 'column',
      height: 50,
      justifyContent: 'center',
      position: 'absolute',
      width: 50
    },
    leftBar: {
      backgroundColor: theme.colors.background,
      borderTopRightRadius: 2,
      height: 65,
      left: 0,
      position: 'absolute',
      width: '42%'
    },
    rightBar: {
      backgroundColor: theme.colors.background,
      borderTopLeftRadius: 2,
      height: 65,
      position: 'absolute',
      right: 0,
      width: '42%'
    },
    tabBar: {
      backgroundColor: theme.colors.transparent,
      height: 65,
      position: 'relative'
    }
  })
