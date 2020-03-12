/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = function(config) {
  config.set({
    coverageAnalysis: 'off',
    maxConcurrentTestRunners: 5,
    mutate: [
      'src/**/*.ts',
      'src/**/*.tsx',
      '!src/**/__tests__/*'
    ],
    mutator: 'typescript',
    jest: {
      projectType: 'create-react-app'
    },
    reporters: ['html', 'clear-text', 'progress', 'dashboard'],
    testRunner: 'jest',
    timeoutMS: 60000,
    tsconfigFile: 'tsconfig.json',
  });
};
