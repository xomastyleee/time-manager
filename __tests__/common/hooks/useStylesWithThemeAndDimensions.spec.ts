import { type ScaledSize, StyleSheet, useWindowDimensions } from 'react-native'
import { renderHook } from '@testing-library/react-hooks'

import { useStylesWithThemeAndDimensions } from '../../../src/modules/common/hooks'
import { useAppTheme } from '../../../src/modules/common/hooks/useDefinedTheme'
import type { AppTheme } from '@modules/common/theme'

jest.mock('../../../src/modules/common/hooks/useDefinedTheme', () => ({
  useAppTheme: jest.fn()
}))

jest.mock('react-native', () => ({
  useWindowDimensions: jest.fn(),
  StyleSheet: {
    create: jest.fn((styles) => styles)
  },
  Dimensions: {
    get: jest.fn(() => ({ height: 800, with: 400 }))
  }
}))

const mockUseAppTheme = useAppTheme as jest.Mock
const mockUseWindowDimensions = useWindowDimensions as jest.Mock

describe('useStylesWithThemeAndDimensions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should return styles and theme', () => {
    const mockTheme = {
      colors: { primary: '#fff' },
      fonts: { regular: { fontFamily: 'Roboto', fontWeight: '400' } },
      roundness: 4,
      animation: { scale: 1.0 }
    }
    const mockDimensions = { width: 360, height: 640, scale: 2, fontScale: 2 }
    mockUseAppTheme.mockReturnValue(mockTheme)
    mockUseWindowDimensions.mockReturnValue(mockDimensions)

    const createStyles = ({ theme, dimensions }: { theme: AppTheme; dimensions: ScaledSize }) =>
      StyleSheet.create({
        container: {
          backgroundColor: theme.colors.primary,
          width: dimensions.width
        }
      })

    const { result } = renderHook(() => useStylesWithThemeAndDimensions(createStyles))

    expect(result.current.styles.container.backgroundColor).toBe(mockTheme.colors.primary)
    expect(result.current.styles.container.width).toBe(mockDimensions.width)
    expect(result.current.colors).toBe(mockTheme.colors)
    expect(result.current.fonts).toBe(mockTheme.fonts)
    expect(result.current.roundness).toBe(mockTheme.roundness)
    expect(result.current.animation).toBe(mockTheme.animation)
  })
})
