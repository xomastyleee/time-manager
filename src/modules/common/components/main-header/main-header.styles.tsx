import { StyleSheet } from 'react-native'
import { type AppTheme } from '@common/theme'

export const stylesWithTheme = (theme: AppTheme) =>
  StyleSheet.create({
    iconButtonWrapper: {
      flexDirection: 'column',
      justifyContent: 'center'
    },
    label: {
      color: theme.colors.text,
      fontWeight: 'bold',
      textShadowColor: theme.colors.shadow,
      textShadowOffset: { width: -0.1, height: 0.1 },
      textShadowRadius: 0.8
    },
    labelWrapper: {
      alignItems: 'center',
      flexDirection: 'row',
      height: '100%',
      width: '50%'
    },
    main: {
      backgroundColor: theme.colors.transparent,
      flexDirection: 'row',
      height: 40,
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      width: '100%'
    }
  })
