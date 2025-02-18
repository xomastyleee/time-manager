import { pathsToModuleNameMapper, type JestConfigWithTsJest } from 'ts-jest'
import { defaults as tsjPreset } from 'ts-jest/presets'

import { compilerOptions } from './tsconfig.json'

const jestConfig: JestConfigWithTsJest = {
  ...tsjPreset,
  displayName: 'frog-time-unit',
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testEnvironment: 'node',
  coverageDirectory: './coverage',
  collectCoverage: true,
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.spec.json',
        useESM: true,
        babelConfig: './babel.config.js'
      }
    ],
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  coveragePathIgnorePatterns: ['/node_modules/', '/.node/', '/jest/'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-native-community|@react-navigation|@react-native/polyfills|@react-native/js-polyfills|react-native-reanimated|react-native-safe-area-context)/)'
  ],
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  setupFilesAfterEnv: [
    './__tests__/testUtils/setupTests.ts',
    './node_modules/react-native-gesture-handler/jestSetup.js'
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' })
}

export default jestConfig
