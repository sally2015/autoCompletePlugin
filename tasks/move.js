const gulp = require('gulp');
const path = require('path');
const fs = require('fs');
const clean = require('./clean');
const buildPath = path.resolve(__dirname, '../build');
const srcPath = path.resolve(__dirname, '../src');

function move(cb) {
    gulp.src(path.resolve(srcPath, './_locales/**/*.json'))
      .pipe(gulp.dest(path.resolve(buildPath, './_locales')));

    gulp.src(path.resolve(__dirname, '../config/reload.js'))
      .pipe(gulp.dest(path.resolve(buildPath)));

    fs.mkdirSync(buildPath);
    var manifest = require('../src/manifest.json');
    manifest.background.scripts.push('./reload.js');
    fs.writeFileSync(path.resolve(buildPath, './manifest.json'), JSON.stringify(manifest, null, 2));
    cb();
}

module.exports = move