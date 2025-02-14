import { StyleSheet } from 'react-native'

import type { CreateStylesProps } from '@common/hooks'

const COLORS = {
  background: '#E3F2FD',
  textPrimary: '#333',
  textSecondary: '#666'
}

export const stylesWithTheme = ({ theme }: CreateStylesProps) =>
  StyleSheet.create({
    card: {
      borderRadius: 10,
      elevation: 3,
      margin: 10,
      padding: 10
    },
    chip: {
      backgroundColor: COLORS.background // голубой фон для меток
    },
    date: {
      color: COLORS.background,
      fontSize: 14,
      marginBottom: 5
    },
    description: {
      color: COLORS.textPrimary,
      fontSize: 14
    },
    main: {
      backgroundColor: theme.colors.transparent,
      flex: 1
    },
    row: {
      flexDirection: 'row',
      gap: 8,
      marginVertical: 5
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5
    }
  })
