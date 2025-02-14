import { StyleSheet } from 'react-native'
import { type CreateStylesProps } from '@common/hooks'

export const stylesWithTheme = ({ theme }: CreateStylesProps) =>
  StyleSheet.create({
    main: { backgroundColor: theme.colors.primaryBackground, flex: 1 }
  })
