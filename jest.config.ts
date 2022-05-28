import type { Config } from '@jest/types'
import { defaults } from 'jest-config'

const config: Config.InitialOptions = {
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  collectCoverage: true,
  coverageDirectory: '.coverage',
  coverageProvider: 'v8',
  extensionsToTreatAsEsm: ['.ts'],
  moduleFileExtensions: ['ts', 'js', ...defaults.moduleFileExtensions],
  preset: 'ts-jest/presets/default-esm',
  reporters: ['default', 'github-actions'],
  transform: {
    '\\.ts$': 'ts-jest',
  },
  verbose: true,
}

export default config
