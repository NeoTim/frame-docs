'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var fileinclude = require('gulp-file-include');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');

gulp.task('sass', function () {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    })
      .on('error', sass.logError))
    .pipe(sourcemaps.init())
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie >= 10']
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('html', function() {
  gulp.src(['./html/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      indent: true,
      basepath: '@file'
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('scripts', function() {
  return gulp.src('./js/*.js')
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('./build/js/'))
    .pipe(rename('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js/'));
});

gulp.task('watch', function () {
  gulp.watch('./scss/**/*.scss', ['sass']);
  gulp.watch('./html/**/*.html', ['html']);
  gulp.watch('./js/**/*.js', ['scripts']);
});

gulp.task('default', ['sass','html','scripts','watch']);
