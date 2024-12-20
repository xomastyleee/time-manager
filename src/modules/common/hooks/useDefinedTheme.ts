import { useColorScheme } from 'react-native'
import { useTheme } from 'react-native-paper'

import { darkTheme, lightTheme, AppTheme } from '../theme'

export const useDefinedTheme = (isDark = false) => {
  const colorScheme = useColorScheme()

  const paperTheme = colorScheme === 'dark' || isDark ? darkTheme : lightTheme

  return paperTheme as AppTheme
}

export const useAppTheme = useTheme<AppTheme>
