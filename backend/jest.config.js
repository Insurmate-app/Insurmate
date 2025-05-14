module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.js'],
  collectCoverageFrom: [
    'services/**/*.js',
    'controllers/**/*.js',
    'models/**/*.js',
    'utils/**/*.js'
  ],
  coverageDirectory: 'coverage'
};