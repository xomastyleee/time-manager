import { StyleSheet } from 'react-native'
import { useMemo } from 'react'

import { useAppTheme } from './useDefinedTheme'
import type { AppTheme } from '../theme'

export const useStylesWithTheme = <T>(createStyles: (t: AppTheme) => StyleSheet.NamedStyles<T>) => {
  const theme = useAppTheme()
  const styles = createStyles(theme)

  const populatedStylesAndTheme = useMemo(() => ({ styles, ...theme }), [styles, theme])

  return populatedStylesAndTheme
}
