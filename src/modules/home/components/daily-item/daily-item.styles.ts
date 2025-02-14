import { StyleSheet } from 'react-native'
import { type CreateStylesProps } from '@common/hooks'

export const stylesWithTheme = ({ theme: { colors } }: CreateStylesProps) =>
  StyleSheet.create({
    main: {
      backgroundColor: colors.onScreenContent,
      borderRadius: 20,
      height: 100,
      marginVertical: 10,
      padding: 10,
      width: '100%'
    }
  })
