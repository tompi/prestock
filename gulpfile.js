'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');

gulp.task('test', function () {
  return gulp.src('test/**/*.js', {read: false})
    .pipe(mocha({
      globals: {
        should: require('should')
      }
    }));
});

gulp.task('lint', function () {
  gulp.src(['**/*.js', '!node_modules/**'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

