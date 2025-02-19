import { StyleSheet } from 'react-native'
import { type CreateStylesProps } from '@common/hooks'

export const stylesWithTheme = ({ theme }: CreateStylesProps) =>
  StyleSheet.create({
    // eslint-disable-next-line react-native/no-color-literals
    animatedButton: {
      borderRadius: 8,
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 2, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 5
    },
    buttonContainer: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 20
    },
    container: {
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 24
    },
    resetButton: {
      backgroundColor: theme.colors.accent
    },
    // eslint-disable-next-line react-native/no-color-literals
    timerText: {
      color: theme.colors.primary,
      fontSize: 56,
      fontWeight: 'bold',
      marginBottom: 20,
      textShadowColor: 'rgba(0, 0, 0, 0.2)',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 5
    }
  })
