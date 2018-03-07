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
<<<<<<< HEAD
        'HOTJAR': JSON.stringify('812791'),
        'TOGGLES': {
          'RATING': false
        }
=======
        'TOGGLE_RATING': JSON.stringify('OFF')
>>>>>>> T136 [Javier/JC] Se agregan tests para feature toggle de Rating
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
