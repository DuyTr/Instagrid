'use strict';

var gulp = require('gulp'); // Load Gulp!
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

gulp.task('scss', function () {
  gulp.src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
         browsers: ['last 2 versions']
      }))
      .pipe(gulp.dest('./'))
      .pipe(minifyCSS())
      .pipe(rename('main.min.css'))
      .pipe(gulp.dest('./build/css'));
});


// create browser
gulp.task('newbrowser', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

// make browser reload on change
   gulp.watch('./scss/**/*.scss', ['scss']);
   gulp.watch(['index.html','js/*.js','css/*.css']).on('change', browserSync.reload);


});
