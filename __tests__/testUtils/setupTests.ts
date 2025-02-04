import '@testing-library/react-native/extend-expect'

jest.mock('react-native-bootsplash', () => ({
  hide: jest.fn(),
  isVisible: jest.fn().mockResolvedValue(false),
  useHideAnimation: jest.fn().mockReturnValue({
    container: {},
    logo: { source: 0 },
    brand: { source: 0 }
  })
}))
