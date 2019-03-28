const path = require('path');
const fs = require('fs');
const fsExtra = require('fs-extra')
const webpack = require('webpack');
const devServer = require('webpack-dev-server');
const entries = require('./entries')
const webpackDevConfig = require('../config/webpack.dev.config.js');
const devPath = path.resolve(__dirname, '../dev');

function webpackDev(cb) {
    let port = 3009;
    entries(webpackDevConfig);
    
    for (let e in webpackDevConfig.entry) {
      webpackDevConfig.entry[e].push(`webpack-dev-server/client?http://localhost:${port}`, 'webpack/hot/dev-server');
    }
    let config = webpackDevConfig;
    let compiler = webpack(config);
    compiler.hooks.emit.tap({name: 'outputDiskPlugin'}, (compilation) => {
      const assets = compilation.assets;
      let file, data, fileDir;
      Object.keys(assets).forEach(key => {
        file = path.resolve(devPath, key);
        fileDir = path.dirname(file);
        if (!fs.existsSync(fileDir)) {
          fs.mkdirSync(fileDir);
        }
        data = assets[key].source();
        fs.writeFileSync(file, data);
      });
      fsExtra.copySync(path.resolve(__dirname, '../config/reload.js'), path.resolve(__dirname, '../dev/reload.js'));
      fsExtra.copySync(path.resolve(__dirname, '../src/manifest.dev.json'), path.resolve(__dirname, '../dev/manifest.json'));
    });
  
    let server = new devServer(compiler, {
      contentBase: '../dev',
      hot: true,
      inline: true,
      clientLogLevel: 'none',
      stats: {
        colors: true,
        chunks: false
      }
    });
    server.listen(port, '127.0.0.1', function() { });
    cb && cb();
  }

webpackDev();