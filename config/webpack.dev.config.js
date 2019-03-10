var path = require('path');
var webpack = require('webpack');
const background = path.resolve(__dirname, '../src/background.js');
var loaders = [
    'style-loader',
    'css-loader',
]
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
    { test: /\.less$/, loader: 'style-loader!css-loader!less-loader!' },
    {
        test: /\.css/,
        use: loaders
    },
    {
        test: /\.(jpg|png|gif|svg)$/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'assets/[name].[hash:4].[ext]'
                }
            }
        ]
    },
    {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'assets/[name].[hash:4].[ext]'
                }
            }
        ]
    },
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
