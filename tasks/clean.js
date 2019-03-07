const gulp = require('gulp');
const path = require('path');
const gulClean = require('gulp-clean');
const buildPath = path.resolve(__dirname, '../build');

let isClean = false;
function clean() {
  if (isClean) {
    return;
  }
  isClean = true;
  return gulp.src(buildPath, {read: false, allowEmpty: true})
             .pipe(gulClean({
                 force: true
             }));
}
module.exports = clean;