'use strict';
var sass = require('gulp-sass'),
jshint = require('gulp-jshint'),
gulp = require('gulp'),
rev = require('gulp-rev'),
autoprefixer = require('gulp-autoprefixer');



/**
 * 复制默认文件
 */
gulp.task('move1', function() {
  gulp.src('app/framework/**/*')
  .pipe(gulp.dest('cache/framework'));
   gulp.src('app/data/*')
  .pipe(gulp.dest('cache/data'));
});
gulp.task('move', function() {
  gulp.src('cache/framework/**/*')
  .pipe(gulp.dest('dist/framework'));
   gulp.src('cache/data/*')
  .pipe(gulp.dest('dist/data'));
});


gulp.task('revFont', function(){
  return gulp.src('app/styles/fonts/*.{eot,svg,ttf,woff,woff2}') //修改_variables.scss  $icon-font-path路径
    .pipe(rev())
    .pipe(gulp.dest('cache/css/fonts'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('cache/rev/font'));
});

// Styles task
gulp.task('styles', function() {
  gulp.src('app/styles/*.scss')
  // The onerror handler prevents Gulp from crashing when you make a mistake in your SASS
  .pipe(sass({onError: function(e) { console.log(e); } }))
  // Optionally add autoprefixer
  .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 8'))
  // These last two should look familiar now :)
  .pipe(gulp.dest('app/styles/'));
});

// JSHint task
gulp.task('lint', function() {
  gulp.src('app/scripts/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});