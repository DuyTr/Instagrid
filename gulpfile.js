'use strict';

var gulp = require('gulp'); // Load Gulp!
var autoprefixer = require('gulp-autoprefixer');
// Now that we've installed the uglify package
// we can require it!

var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

gulp.task('scss', function () {
  gulp.src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
         browsers: ['last 2 versions']
      }))
    .pipe(gulp.dest('./css'));
});


// create browser
gulp.task('newbrowser', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
  //   // call 2 tasks on change
  //   gulp.watch('js/*.js', ['compress-main-js']);
  //  gulp.watch('css/*.css', ['compress-main-css']);

// make browser reload on change
   gulp.watch('./scss/**/*.scss', ['scss']);
   gulp.watch(['index.html','js/*.js','css/*.css']).on('change', browserSync.reload);


});
