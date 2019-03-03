var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    background: [
      path.resolve(__dirname, '../src/background.js')
    ]
  },
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      { test: /\.vue$/, loader: 'vue' },
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.less$/, loader: 'style!css!less' }
    ]
  },
  babel: {
    presets: ['env']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"producttion"'
      }
    })
  ],
  color: true
};
