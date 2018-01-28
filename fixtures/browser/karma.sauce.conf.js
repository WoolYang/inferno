const path = require('path');
const resolve = pkg => path.join(__dirname, '../../packages', pkg, 'src');

const customLaunchers = {
  slIphone5: {
    base: 'SauceLabs',
    browserName: 'iphone',
    version: '8.4'
  },
  slIpad: {
    base: 'SauceLabs',
    browserName: 'ipad',
    version: '10.3'
  },
  slIphone6: {
    base: 'SauceLabs',
    browserName: 'iphone',
    version: '10.3'
  },
  slSafari8: {
    base: 'SauceLabs',
    browserName: 'safari',
    platform: 'OS X 10.10'
  },
  slSafari9: {
    base: 'SauceLabs',
    browserName: 'safari',
    platform: 'OS X 10.11'
  },
  slIE9: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 7',
    version: '9'
  },
  slIE10: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 7',
    version: '10'
  },
  slIE11: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 7',
    version: '11'
  },
  slEdge14: {
    base: 'SauceLabs',
    browserName: 'MicrosoftEdge',
    version: '14',
    platform: 'Windows 10'
  },
  slEdge15: {
    base: 'SauceLabs',
    browserName: 'MicrosoftEdge',
    version: '15',
    platform: 'Windows 10'
  },
  slEdge: {
    base: 'SauceLabs',
    browserName: 'MicrosoftEdge',
    platform: 'Windows 10'
  },
  slChrome: {
    base: 'SauceLabs',
    browserName: 'chrome'
  },
  slFirefox: {
    base: 'SauceLabs',
    browserName: 'firefox'
  },
  slAndroid5: {
    base: 'SauceLabs',
    browserName: 'android',
    version: '5.1'
  },
  slAndroid4: {
    base: 'SauceLabs',
    browserName: 'android',
    version: '4.4'
  }
};

module.exports = function(config) {
  config.set({
    basePath: '../../',

    frameworks: ['jasmine', 'jasmine-matchers'],

    files: ['./packages/*/__tests__/**/*.spec.js', './packages/*/__tests__/**/*.spec.jsx'],

    preprocessors: {
      './packages/*/__tests__/**/*': ['webpack'],
      './packages/*/__tests__/*': ['webpack']
    },

    reporters: ['failed', 'saucelabs'],
    sauceLabs: {
      build: 'TRAVIS #' + process.env.TRAVIS_BUILD_NUMBER + ' (' + process.env.TRAVIS_BUILD_ID + ')',
      tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
      startConnect: false,
      testName: `InfernoJS`
    },
    customLaunchers: customLaunchers,
    browsers: Object.keys(customLaunchers),

    browserConsoleLogOptions: {
      level: 'warn',
      terminal: false
    },
    colors: true,
    singleRun: true,
    autoWatch: false,
    concurrency: 1,

    webpackMiddleware: {
      stats: 'errors-only',
      noInfo: true
    },
    webpack: {
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
              presets: ['stage-2'],
              plugins: [
                'transform-decorators-legacy',
                ['babel-plugin-inferno', { imports: true }],
                'transform-es2015-modules-commonjs',
                'transform-class-properties',
                'transform-object-rest-spread',
                'babel-plugin-syntax-jsx',
                'transform-class-properties'
              ]
            }
          },
          {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                target: 'es5',
                module: 'commonjs',
                sourceMap: false
              }
            }
          }
        ]
      },
      resolve: {
        alias: {
          inferno: resolve('inferno'),
          'inferno-compat': resolve('inferno-compat'),
          'inferno-create-class': resolve('inferno-create-class'),
          'inferno-create-element': resolve('inferno-create-element'),
          'inferno-devtools': resolve('inferno-devtools'),
          'inferno-hyperscript': resolve('inferno-hyperscript'),
          'inferno-mobx': resolve('inferno-mobx'),
          'inferno-redux': resolve('inferno-redux'),
          'inferno-router': resolve('inferno-router'),
          'inferno-server': resolve('inferno-server'),
          'inferno-shared': resolve('inferno-shared'),
          'inferno-test-utils': resolve('inferno-test-utils'),
          'inferno-utils': resolve('inferno-utils'),
          'inferno-vnode-flags': resolve('inferno-vnode-flags'),
          'inferno-clone-vnode': resolve('inferno-clone-vnode')
        },
        extensions: ['.js', '.jsx', '.ts'],
        mainFields: ['browser', 'main']
      },
      devServer: {
        noInfo: true
      },
      stats: 'errors-only',
      performance: {
        hints: false
      }
    }
  });
};
