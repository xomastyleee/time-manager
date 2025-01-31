import { StyleSheet } from 'react-native'
import { type AppTheme } from '@common/theme'

export const stylesWithTheme = (theme: AppTheme) =>
  StyleSheet.create({
    errorMessage: {
      color: theme.colors.textSecondary,
      fontSize: 16,
      marginHorizontal: 20,
      textAlign: 'center'
    },
    errorTitle: {
      color: theme.colors.error,
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center'
    },
    loader: {
      borderColor: theme.colors.primary,
      borderRadius: 30,
      borderTopColor: theme.colors.primary,
      borderWidth: 6,
      height: 60,
      width: 60
    },
    loadingContainer: {
      alignItems: 'center',
      justifyContent: 'center'
    },
    loadingMessage: {
      color: theme.colors.textSecondary,
      fontSize: 16,
      marginTop: 10,
      textAlign: 'center'
    }
  })
