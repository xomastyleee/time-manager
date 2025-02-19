import { StyleSheet } from 'react-native'
import { type CreateStylesProps } from '@common/hooks'

export const stylesWithTheme = ({ theme: { colors } }: CreateStylesProps) =>
  StyleSheet.create({
    picker: {
      borderColor: colors.onBackground,
      borderRadius: 5,
      borderWidth: 0.5,
      marginVertical: 12,
      padding: 10,
      width: '100%'
    },
    pickerOption: {
      padding: 10
    },
    pickerOptions: {
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    title: {
      textAlign: 'center',
      width: '100%'
    }
  })
