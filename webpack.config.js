/* eslint-disable spellcheck/spell-checker */
const path = require('path');
const fs = require('fs');

const browserTestConfig = {
  mode: 'development',
  entry: fs
    .readdirSync(path.join(__dirname, 'coverage/nodejs'))
    .map((eachFile) => path.join(__dirname, 'coverage/nodejs', eachFile)),
  output: {
    path: path.join(__dirname, 'coverage/browser'),
    filename: 'browser.spec.js',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  optimization: {
    minimize: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
    ],
  },
};
const browserConfig = {
  mode: 'production',
  entry: {
    koconut: './dist/index.js',
  },
  output: {
    path: path.join(__dirname, '/webpack'),
    filename: `[name].js`,
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  optimization: {
    minimize: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
    ],
  },
};

module.exports = [browserConfig, browserTestConfig];
