const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = Merge(CommonConfig, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'ENVIRONMENT': JSON.stringify('STAGING'),
        'SERVICE_URL': JSON.stringify('https://staging-abacaxi-frontend.herokuapp.com'),
        'BASE_URL': JSON.stringify('api'),
        'RATE_POST_URL': JSON.stringify('api/rating'),
        'HOTJAR': JSON.stringify('812800'),
        'TRACKING_ID': JSON.stringify('UA-120667527-1')
      }
    })
  ],
  devServer: {
    historyApiFallback: true
  }
});
