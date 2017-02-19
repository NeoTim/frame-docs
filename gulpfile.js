'use strict';
var gulp = require('gulp');



//// CSS ////
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function () {
  return gulp.src('./scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed'
    })
      .on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie >= 10']
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./build/css'));
});

//// JAVASCRIPT ////
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('js', function() {
  return gulp.src([
    './js/*.js'
  ])
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js/'));
});



//// HTML ////
var fileinclude = require('gulp-file-include');

gulp.task('html', function() {
  gulp.src(['./html/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      indent: true,
      basepath: '@file'
    }))
    .pipe(gulp.dest('./build'));
});



//// WATCH ALL ////
gulp.task('watch', function () {
  gulp.watch('./scss/**/*.scss', ['sass']);
  gulp.watch('./html/**/*.html', ['html']);
  gulp.watch('./js/**/*.js', ['js']);
});



//// BUILD ////
gulp.task('build', ['sass','html','js']);



//// DEFAULT – COMPILE ALL AND BUILD ////
gulp.task('default', ['sass','html','js','watch']);
