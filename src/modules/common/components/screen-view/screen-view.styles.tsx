import { StyleSheet } from 'react-native'
import { CreateStylesProps } from '@common/hooks'

export const stylesWithTheme = ({ theme }: CreateStylesProps) =>
  StyleSheet.create({
    main: {
      backgroundColor: theme.colors.transparent,
      flex: 1
    }
  })
