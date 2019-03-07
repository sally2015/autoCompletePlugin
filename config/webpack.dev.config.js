var path = require('path');
var webpack = require('webpack');
const background = path.resolve(__dirname, '../src/background.js');
module.exports = {
  context: path.resolve(__dirname, '..'),
  mode: 'development',
  entry: {
    background: [background],
  },
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: '[name].js',
    sourceMapFilename: './sourcemap/[file].map'
  },
  resolve: {
    extensions: ['.js', '.vue']
  },
  module: {
    rules: [
      { test: /\.vue$/, loader: 'vue-loader' },
        { 
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'stage-2'],
                    plugins: ['transform-runtime', 'transform-decorators-legacy']
                }
            }]
        },
      { test: /\.less$/, loader: 'style!css!less!sourceMap' }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.js'
    }
  },
  optimization: {
    minimize: false
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"development"'
      }
    })
  ],
  devtool: '#source-map'
};
