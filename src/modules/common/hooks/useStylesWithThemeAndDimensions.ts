import { useMemo } from 'react'
import { StyleSheet, useWindowDimensions, type ScaledSize } from 'react-native'

import { useAppTheme } from './useDefinedTheme'
import type { AppTheme } from '../theme'

export interface CreateStylesProps {
  theme: AppTheme
  dimensions: ScaledSize
}

export const useStylesWithThemeAndDimensions = <T>(
  createStyles: ({ theme, dimensions }: CreateStylesProps) => StyleSheet.NamedStyles<T>
) => {
  const theme = useAppTheme()
  const dimensions = useWindowDimensions()

  const styles = createStyles({ theme, dimensions })

  const populatedStylesWithThemeAndDimensions = useMemo(
    () => ({ styles, ...theme, ...dimensions }),
    [dimensions, styles, theme]
  )

  return populatedStylesWithThemeAndDimensions
}
