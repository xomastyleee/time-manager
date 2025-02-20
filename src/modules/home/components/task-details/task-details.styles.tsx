import { type CreateStylesProps } from '@common/hooks'
import { StyleSheet } from 'react-native'

export const stylesWithTheme = ({ theme }: CreateStylesProps) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: 8,
      elevation: 3,
      margin: 12,
      padding: 15
    },
    divider: {
      marginVertical: 8
    },
    label: {
      color: theme.colors.text,
      fontSize: 16,
      fontWeight: 'bold'
    },
    row: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 6
    },
    text: {
      color: theme.colors.text,
      fontSize: 16
    }
  })
