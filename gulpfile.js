const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const minifycss = require('gulp-uglifycss');
const rename = require('gulp-rename');
const clean = require('gulp-clean');

gulp.task('clear-dist', () => {
    return gulp
    .src('./dist/*', {read: false})
    .pipe(clean())
})

gulp.task('copy-html-to-dist', () => {
    return gulp
    .src('src/views/*.html')
    .pipe(gulp.dest('dist/src/views'))
}) 

gulp.task('copy-images-to-dist', () => {
    return gulp
    .src('src/images/**.*')
    .pipe(gulp.dest('dist/src/images'))
}) 

gulp.task('copy-script-to-dist', () => {
    return gulp
    .src('src/js/**.*')
    .pipe(gulp.dest('dist/src/js'))
}) 

gulp.task('copy-bootstrap-script-to-dist', () => {
    return gulp
    .src('node_modules/bootstrap/dist/js/bootstrap.min.js')
    .pipe(gulp.dest('dist/src/js'))
}) 

gulp.task('copy-minify-normalize-style-to-dist', () => { 
    return gulp
    .src('node_modules/normalize.css/normalize.css')
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/src/css/vendors'))
})

gulp.task('convert-and-minify-main-style', () => {
    return gulp
    .src('src/scss/*.scss')
    .pipe(sass())
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/src/css'))
})


gulp.task('default', gulp.series('clear-dist', 'copy-script-to-dist', 'copy-html-to-dist', 'copy-images-to-dist', 'convert-and-minify-main-style', 'copy-minify-normalize-style-to-dist', 'copy-bootstrap-script-to-dist'));