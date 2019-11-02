module.exports = {
  testPathIgnorePatterns: [
    '<rootDir>/demo/',
  ],
  watchPathIgnorePatterns: [
    '<rootDir>/demo/',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/demo/',
  ],
  collectCoverageFrom: [
    '**/src/*.{js,jsx}',
    '!**/src/defaultFetchAdapter.js'
  ]
}