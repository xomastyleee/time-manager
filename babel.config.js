module.exports = {
  presets: ['module:@react-native/babel-preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
  plugins: [
    'react-native-reanimated/plugin',
    '@babel/plugin-transform-react-jsx',
    'transform-inline-environment-variables',
    '@babel/plugin-transform-export-namespace-from',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@assets': './src/app/assets/',
          '@navigators': './src/app/navigators',
          '@modules': './src/modules',
          '@common': './src/modules/common',
          '@db': './src/app/db',
        }
      }
    ],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
};
