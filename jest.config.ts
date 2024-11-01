module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  globalSetup: 'jest-preset-angular/global-setup',
  collectCoverage: true,
  coverageReporters: ['html', 'text-summary'],
  coverageDirectory: 'coverage/jest',
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/app/$1'
  }
  // coverageThreshold: {
  //   global: {
  //     branches: 70,
  //     functions: 70,
  //     lines: 70,
  //     statements: 70
  //   }
  // }
};
