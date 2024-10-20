import { pathsToModuleNameMapper, type JestConfigWithTsJest } from 'ts-jest'
import { defaults as tsjPreset } from 'ts-jest/presets'
import { compilerOptions } from './tsconfig.json'

const jestConfig: JestConfigWithTsJest = {
  ...tsjPreset,
  displayName: 'frog-time',
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testEnvironment: 'node',
  coverageDirectory: './coverage',
  collectCoverage: true,
  transform: {
    '^.+\\.[tj]sx?$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.spec.json',
        useESM: true
      }
    ]
  },
  coveragePathIgnorePatterns: ['/node_modules/', '/.node/', '/jest/'],
  transformIgnorePatterns: ['node_modules'],
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  setupFilesAfterEnv: ['./__tests__/testUtils/setupTests.ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' })
}

export default jestConfig
