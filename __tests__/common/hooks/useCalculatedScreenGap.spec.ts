import { useWindowDimensions, View } from 'react-native'
import { renderHook, act } from '@testing-library/react-hooks'

import { useCalculatedScreenGap } from '../../../src/modules/common/hooks'

jest.mock('react-native', () => ({
  useWindowDimensions: jest.fn(() => ({ height: 800 }))
}))

jest.mock('react-native-paper', () => ({
  useTheme: jest.fn(),
  MD3LightTheme: { colors: { primary: '#fff' }, fonts: {} },
  MD3DarkTheme: { colors: { primary: '#000' }, fonts: {} },
  MD3Theme: { colors: {}, fonts: {} }
}))

const mockUseWindowDimensions = useWindowDimensions as jest.Mock

describe('useCalculatedScreenGap', () => {
  beforeAll(() => {
    jest.clearAllMocks()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  test.each([
    {
      windowHeight: 800,
      contentHeight: 700,
      isGapActive: false,
      expectedGap: 30
    },
    {
      windowHeight: 800,
      contentHeight: 500,
      isGapActive: false,
      expectedGap: 0
    },
    {
      windowHeight: 800,
      contentHeight: 500,
      isGapActive: true,
      expectedGap: 30
    }
  ])('Should return correct gap for: %s', ({ windowHeight, contentHeight, isGapActive, expectedGap }) => {
    mockUseWindowDimensions.mockReturnValueOnce({ height: windowHeight })
    const { result } = renderHook(() => useCalculatedScreenGap(isGapActive))
    const { handleLayout, viewRef } = result.current

    // Mock measure function
    viewRef.current = {
      measure: (callback: (x: number, y: number, width: number, height: number) => void) =>
        callback(0, 0, 0, contentHeight)
    } as unknown as View

    act(() => {
      handleLayout()
    })

    expect(result.current.gap).toBe(expectedGap)
  })
})
