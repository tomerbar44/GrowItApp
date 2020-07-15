const expoPreset = require('jest-expo/jest-preset');
const jestPreset = require('@testing-library/react-native/jest-preset');

module.exports = Object.assign(expoPreset, jestPreset, {
  setupFiles: [...expoPreset.setupFiles, ...jestPreset.setupFiles],
  setupFilesAfterEnv: [
    '@testing-library/react-native/cleanup-after-each' /*,'<rootDir>/setup-tests.js'*/
  ],
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|my-project|react-native-button|expo-location|native-base)/)"
  ],
  preset:"jest-expo"
});
