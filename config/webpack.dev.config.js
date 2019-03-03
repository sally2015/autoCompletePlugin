var path = require('path');
var webpack = require('webpack');
const background = path.resolve(__dirname, '../src/background.js');
module.exports = {
    mode: 'development',
  entry: {
    background: [background],
  },
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: '[name].js',
    sourceMapFilename: './sourcemap/[file].map'
  },
  module: {
    rules: [
      { test: /\.vue$/, loader: 'vue' },
        { 
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel',
                options: {
                    presets: ['env']
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
