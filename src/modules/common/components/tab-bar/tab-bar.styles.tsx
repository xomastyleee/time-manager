import { StyleSheet } from 'react-native'
import { CreateStylesProps } from '@common/hooks'

export const stylesWithTheme = ({ theme }: CreateStylesProps) =>
  StyleSheet.create({
    centerCutout: {
      alignSelf: 'center',
      backgroundColor: theme.colors.transparent,
      height: 95,
      width: 64
    },
    extraFabGap: {
      bottom: 50
    },
    fab: {
      alignSelf: 'center',
      backgroundColor: theme.colors.background,
      borderRadius: '50%',
      bottom: 0,
      position: 'absolute'
    },
    iconWrapper: {
      alignItems: 'center',
      flexDirection: 'column',
      height: 50,
      justifyContent: 'center',
      position: 'absolute',
      width: 50
    },
    leftBar: {
      backgroundColor: theme.colors.background,
      borderTopRightRadius: 2,
      flex: 1,
      height: 65
    },
    rightBar: {
      backgroundColor: theme.colors.background,
      borderTopLeftRadius: 2,
      flex: 1,
      height: 65
    },
    tabBar: {
      backgroundColor: theme.colors.transparent,
      flexDirection: 'row',
      height: 65,
      position: 'relative'
    }
  })
