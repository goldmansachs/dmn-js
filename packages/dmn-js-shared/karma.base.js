'use strict';

var loc = require('path');

var coverage = process.env.COVERAGE;

var singleStart = process.env.SINGLE_START;

var mode = process.env.NODE_ENV || 'development';

// use puppeteer provided Chrome for testing
if (!process?.env?.CHROME_BIN) {
  process.env.CHROME_BIN = require('puppeteer').executablePath();
}

// configures browsers to run test against
// any of [ 'ChromeHeadless', 'Chrome', 'Firefox', 'IE' ]
var browsers = (process.env.TEST_BROWSERS || 'ChromeHeadless_Linux').split(/\s*,\s*/g);

const testFile = coverage ? 'test/coverageBundle.js' : 'test/testBundle.js';

module.exports = function(path) {

  return function(karma) {
    const projectName = path.split(loc.sep).at(-1);

    const config = {

      basePath: path,

      frameworks: [
        'webpack',
        'mocha',
        'sinon-chai'
      ],

      files: [
        testFile
      ],

      preprocessors: {
        [testFile]: [ 'webpack', 'env' ]
      },

      reporters: [ 'progress', 'junit' ].concat(coverage ? 'coverage' : []),

      junitReporter: {
        outputDir: loc.join(__dirname, '../../test-results'),
        outputFile: projectName + '-junit.xml',
        useBrowserName: false,
      },

      plugins: [ 'karma-chrome-launcher', 'karma-coverage', 'karma-debug-launcher', 'karma-env-preprocessor', 'karma-junit-reporter', 'karma-webpack', 'karma-mocha', 'karma-sinon-chai' ],

      coverageReporter: {
        reporters: [
          { type: 'lcov', subdir: '.' },
        ]
      },

      customLaunchers: {
        ChromeHeadless_Linux: {
          base: 'ChromeHeadless',
          flags: [
            '--no-sandbox',
            '--disable-setuid-sandbox'
          ],
          debug: true
        }
      },

      browsers: browsers,

      browserNoActivityTimeout: 30000,

      singleRun: true,
      autoWatch: false,

      webpack: {
        mode,

        module: {
          rules: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  plugins: coverage ? [
                    [ 'istanbul', {
                      include: [
                        'src/**'
                      ]
                    } ]
                  ] : [],
                  presets: [
                    [ '@babel/preset-env', {
                      modules: false,
                      targets: {
                        chrome: '91'
                      }
                    } ]
                  ]
                }
              }
            },
            {
              test: /\.css|\.dmn$/,
              type: 'asset/source'
            }
          ]
        },
        resolve: {
          mainFields: [].concat(mode !== 'production' ? [
            'dev:module'
          ] : [], [
            'module',
            'main'
          ]),
          modules: [
            'node_modules',
            path
          ]
        },
        devtool: mode === 'production' ? 'source-map' : 'eval-source-map'
      }
    };

    if (singleStart) {
      config.browsers = [].concat(config.browsers, 'Debug');
      config.envPreprocessor = [].concat(config.envPreprocessor || [], 'SINGLE_START');
    }

    karma.set(config);
  };

};
