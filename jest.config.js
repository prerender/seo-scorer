/** @type {import("ts-jest/dist/types").InitialOptionsTsJest} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['./src'],
  testMatch: ['**/*.(test|spec).ts'],

  silent: true,
  verbose: true,
  bail: true,
  testTimeout: 5000,

  // Coverage configuration
  collectCoverage: true,
  coverageReporters: ['json', 'text'],
  coverageDirectory: './.nyc_output',
  collectCoverageFrom: ['./src/**/*.ts', '!./src/**/index.ts'],
  coverageThreshold: {
    global: {
      statements: 80,
      functions: 80,
      lines: 80,
      branches: 80,
    },
  },

  //globalSetup: './tests/global.setup.js',
};

module.exports = config;
