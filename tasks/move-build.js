const path = require('path')
const gulp = require('gulp')
const fs = require('fs')
const srcPath = path.resolve(__dirname, '../src');
const buildPath = path.resolve(__dirname, '../build');


function moveBuild(cb) {
    gulp.src(path.resolve(srcPath, './_locales/**/*.json'))
        .pipe(gulp.dest(path.resolve(buildPath, './locales')));
  
    fs.mkdirSync(buildPath);
    let manifest = require('../src/manifest.build.json');
    fs.writeFileSync(path.resolve(buildPath, './manifest.json'), JSON.stringify(manifest, null, 2));
    cb()
}

module.exports = moveBuild;