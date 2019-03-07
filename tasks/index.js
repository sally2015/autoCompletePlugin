const clean = require('./clean');
const entries = require('./entries');
const move = require('./move');
const webapackDev = require('./webpack-dev');
const gulp = require('gulp');
exports.clean = clean;
exports.entries = entries;
exports.move = move;
exports.webapackDev = webapackDev;

exports.dev = gulp.series(clean, entries, move, webapackDev);