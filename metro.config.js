// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add polyfill resolvers
config.resolver.extraNodeModules.crypto = require.resolve('expo-crypto');

// Fix module resolution for newer SDK versions
config.resolver.unstable_enablePackageExports = true;

// Add resolverMainFields for better compatibility
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];

// Handle problematic packages
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

module.exports = config;
