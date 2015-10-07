var gulp = require('gulp'); // Load Gulp!
// Now that we've installed the uglify package
// we can require it!
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var connect = require('gulp-connect');


gulp.task('compress-main-js', function(){
    gulp.src('js/*.js')
        .pipe(concat('main.min.js'))
        .pipe(uglify()) // Call the uglify function on these files
        .pipe(gulp.dest('build/js')) // Where do we put the result?
});

gulp.task('compress-main-css', function(){
    gulp.src('css/*.css')
      .pipe(concat('main.min.css'))
      .pipe(minify())
      .pipe(gulp.dest('build/css'))
});

// create browser
gulp.task('newbrowser', ['compress-main-css' , 'compress-main-js'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    // call 2 tasks on change
    gulp.watch('js/*.js', ['compress-main-js']);
   gulp.watch('css/*.css', ['compress-main-css']);

// make browser reload on change
   gulp.watch('js/*.js').on('change', browserSync.reload);
   gulp.watch('css/*.css').on('change', browserSync.reload);


});
