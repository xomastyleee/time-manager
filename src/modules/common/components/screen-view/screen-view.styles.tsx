import { StyleSheet } from 'react-native'
import { type AppTheme } from '@common/theme'

export const stylesWithTheme = (theme: AppTheme) =>
  StyleSheet.create({
    main: {
      backgroundColor: theme.colors.transparent,
      flex: 1
    }
  })
