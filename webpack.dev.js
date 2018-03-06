const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = Merge(CommonConfig, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'ENVIRONMENT': JSON.stringify('DEV'),
        'SERVICE_URL': JSON.stringify('https://abacaxi-backend.herokuapp.com'),
        'BASE_URL': JSON.stringify('index.php/wp-json/wp/v2'),
        'RATE_POST_URL': JSON.stringify('wp-admin/admin-ajax.php'),
        'TOGGLES': {
          'RATING': true
        }
      }
    })
  ],
  devServer: {
    historyApiFallback: true
  }
});
