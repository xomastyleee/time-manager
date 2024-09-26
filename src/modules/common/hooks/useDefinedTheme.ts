import { useTheme } from 'react-native-paper'
import { useColorScheme } from 'react-native'
import { darkTheme, lightTheme, AppTheme } from '../theme'

export const useDefinedTheme = (isDark = false) => {
  const colorScheme = useColorScheme()

  const paperTheme = colorScheme === 'dark' || isDark ? darkTheme : lightTheme

  return paperTheme
}

export const useAppTheme = useTheme<AppTheme>
