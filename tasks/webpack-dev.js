const path = require('path');
const webpack = require('webpack');
const devServer = require('webpack-dev-server');
const gulp = require('gulp');
const clean = require('./clean');
const webpackDevConfig = require('../config/webpack.dev.config.js');
const buildPath = path.resolve(__dirname, '../build');
function webpackDev(cb) {
    // process.env.NODE_ENV = 'development';
    let port = 3009;
    // for (let e in webpackDevConfig.entry) {
    //   webpackDevConfig.entry[e].push(`webpack-dev-server/client?http://localhost:${port}`, 'webpack/hot/dev-server');
    // }

  
    let config = Object.create(webpackDevConfig);
    config.mode = 'development';
    console.log(JSON.stringify(config.entry), null, 2)

    let compiler = webpack(config);
    // compiler.plugin('emit', (compilation, callback) => {
    //   const assets = compilation.assets;
    //   let file, data, fileDir;
    //   Object.keys(assets).forEach(key => {
    //     file = path.resolve(buildPath, key);
    //     fileDir = path.dirname(file);
    //     if (!fs.existsSync(fileDir)) {
    //       fs.mkdirSync(fileDir);
    //     }
    //     data = assets[key].source();
    //     fs.writeFileSync(file, data);
    //   });
    //   callback();
    // });
  
    let server = new devServer(compiler, {
      contentBase: '../build',
      hot: true,
      inline: true,
      clientLogLevel: 'none',
      stats: {
        colors: true,
        chunks: false
      }
    });
    server.listen(port, '127.0.0.1', function() { });
    cb();
  }

//   module.exports = gulp.series(clean, webpackDev);
  module.exports = webpackDev