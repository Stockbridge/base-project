var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var concat = require('gulp-concat');
var stylus = require('gulp-stylus');
var nib = require('nib');
var del = require('del');

// compile HBS templates to src/js
gulp.task('templates', function(){
  gulp.src('src/templates/**/*.hbs')
    .pipe(handlebars())
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'Application.templates',
      noRedeclare: true, // Avoid duplicate declarations 
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('src/js/'));
});

// clean dist folder
gulp.task('clean', function(cb) {
  del(['dist/*'], cb);
});

// compile minified scripts
gulp.task('build', ['templates', 'stylus'], function() {
  return gulp.src('src/js/**/*.js')
    .pipe(uglify())
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'));
});

// compile scripts
gulp.task('scripts', ['templates'], function() {
  return gulp.src('src/js/**/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'));
});

// compile stylus
gulp.task('stylus', function () {
  gulp.src('src/styl/main.styl')
    .pipe(stylus({ use: nib(), compress: true }))
    .pipe(gulp.dest('dist/css'));
});
 
// watch on compile
gulp.task('watch', function() {
  gulp.watch('src/js/**/*/js', ['scripts']);
  gulp.watch('src/styl/**/*.hbs', ['stylus']);
});

 
// default task
gulp.task('default', ['clean', 'scripts', 'stylus', 'watch']);
