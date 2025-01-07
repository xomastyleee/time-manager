import { StyleSheet } from 'react-native'
import { renderHook } from '@testing-library/react-hooks'

import { useStylesWithTheme } from '../../../src/modules/common/hooks'
import { useAppTheme } from '../../../src/modules/common/hooks/useDefinedTheme'
import type { AppTheme } from '@modules/common/theme'

jest.mock('../../../src/modules/common/hooks/useDefinedTheme', () => ({
  useAppTheme: jest.fn()
}))

const mockUseAppTheme = useAppTheme as jest.Mock

describe('useStylesWithTheme', () => {
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
    mockUseAppTheme.mockReturnValue(mockTheme)

    const createStyles = (theme: AppTheme) =>
      StyleSheet.create({
        container: {
          backgroundColor: theme.colors.primary
        }
      })

    const { result } = renderHook(() => useStylesWithTheme(createStyles))

    expect(result.current.styles.container.backgroundColor).toBe(mockTheme.colors.primary)
    expect(result.current.colors).toBe(mockTheme.colors)
    expect(result.current.fonts).toBe(mockTheme.fonts)
    expect(result.current.roundness).toBe(mockTheme.roundness)
    expect(result.current.animation).toBe(mockTheme.animation)
  })
})
