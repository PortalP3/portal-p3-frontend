const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = Merge(CommonConfig, {
  devtool: false,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'ENVIRONMENT': JSON.stringify('PROD'),
        'SERVICE_URL': JSON.stringify('https://abacaxi-frontend.herokuapp.com'),
        'BASE_URL': JSON.stringify('api'),
        'RATE_POST_URL': JSON.stringify('api/rating'),
        'TOGGLES': {
          'RATING': false
        }
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        comparisons: false,
      },
      output: {
        comments: false,
        ascii_only: true,
      },
      sourceMap: false
    })
  ]
});
