import { StyleSheet } from 'react-native'
import { COLORS } from '@common/types/styles/colors'

export const baseStyles = () =>
  StyleSheet.create({
    label: {
      color: COLORS.red,
      fontSize: 16,
      marginHorizontal: 20,
      textAlign: 'center'
    },
    main: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center'
    }
  })
