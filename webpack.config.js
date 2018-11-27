const path = require('path');
const webpack = require('webpack');
module.exports = {
    entry: {
      main: './src/main.js',
      'run-sagas': './src/run-sagas.js',
      'saga-link': './src/saga-link.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        libraryTarget: 'umd'
    },
    externals: {
      'apollo-link' : 'umd apollo-link'
    },
    target: "node",
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          }
        }
      ]
    },
    stats: {
        colors: true
    }
};
