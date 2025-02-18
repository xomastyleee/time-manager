import '@testing-library/react-native/extend-expect'
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock'

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext)

jest.mock('react-native-bootsplash', () => ({
  hide: jest.fn(),
  isVisible: jest.fn().mockResolvedValue(false),
  useHideAnimation: jest.fn().mockReturnValue({
    container: {},
    logo: { source: 0 },
    brand: { source: 0 }
  })
}))

jest.mock('@react-navigation/native', () => ({
  useFocusEffect: jest.fn(),
  select: jest.fn()
}))

jest.mock('react-native-paper', () => ({
  FAB: jest.fn(),
  Icon: jest.fn(),
  Portal: jest.fn(),
  useTheme: jest.fn(),
  MD3LightTheme: { colors: { primary: '#fff' }, fonts: {} },
  MD3DarkTheme: { colors: { primary: '#000' }, fonts: {} },
  MD3Theme: { colors: {}, fonts: {} }
}))

jest.mock('react-native-svg', () => ({
  Svg: jest.fn(),
  Path: jest.fn()
}))

jest.mock('react-native-reanimated', () => ({
  call: () => {}
}))

jest.mock('react-native-gesture-handler', () => ({
  ScrollView: jest.fn().mockImplementation(({ children }) => children),
  GestureHandlerRootView: jest.fn().mockImplementation(({ children }) => children),
  gestureHandlerRootHOC: jest.fn().mockImplementation(() => () => null),
  State: {},
  PanGestureHandler: jest.fn(),
  TapGestureHandler: jest.fn(),
  LongPressGestureHandler: jest.fn(),
  PinchGestureHandler: jest.fn(),
  RotationGestureHandler: jest.fn(),
  FlingGestureHandler: jest.fn(),
  ForceTouchGestureHandler: jest.fn(),
  Directions: {},
  createNativeWrapper: jest.fn(),
  attachGestureHandler: jest.fn(),
  createGestureHandler: jest.fn(),
  updateGestureHandler: jest.fn(),
  dropGestureHandler: jest.fn(),
  flushGestureHandler: jest.fn(),
  GestureHandlerRootViewContext: jest.fn(),
  GestureHandlerRootViewProvider: jest.fn()
}))
