const webpack = require('webpack');
const webpackBuildConfig = require('../config/webpack.build.config')
function webpackBuild(cb) {
    process.env.NODE_ENV = 'production';

    let compiler = webpack(webpackBuildConfig, (done) => {
        cb();
    });
    // compiler.hooks.emit.tap({name: 'logSuccessPlugin'}, (compilation, callback) => {
    //     console.log(`${getTime()} webpack build success`);
    //     callback();
        
    // })
    
}

module.exports = webpackBuild;