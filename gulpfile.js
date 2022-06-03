const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const minifycss = require('gulp-uglifycss');
const rename = require('gulp-rename');
const clean = require('gulp-clean');
const browser_sync = require('browser-sync').create();

gulp.task('start-browser-sync', function() {
    browser_sync.init({
        server: {
            baseDir: 'dist'
        },
        port: 8080,
    });

});

gulp.task('clear-dist', () => {
    return gulp
    .src('./dist/*', {read: false})
    .pipe(clean())
});

gulp.task('copy-html-to-dist', () => {
    return gulp
    .src('src/views/*.html')
    .pipe(gulp.dest('dist/'))
    .pipe(browser_sync.stream())
});

gulp.task('copy-script-to-dist', () => {
    return gulp
    .src('src/js/**.js')
    .pipe(gulp.dest('dist/js'))
    .pipe(browser_sync.stream())
}); 

gulp.task('copy-bootstrap-script-to-dist', () => {
    return gulp
    .src('node_modules/bootstrap/dist/js/bootstrap.min.js')
    .pipe(gulp.dest('dist/js'))
    .pipe(browser_sync.stream())
});

gulp.task('copy-minify-normalize-style-to-dist', () => { 
    return gulp
    .src('node_modules/normalize.css/normalize.css')
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css/vendors'))
    .pipe(browser_sync.stream())
});

gulp.task('copy-convert-and-minify-main-style-to-dist', () => {
    return gulp
    .src('src/scss/*.scss')
    .pipe(sass())
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css'))
    .pipe(browser_sync.stream())
});

gulp.task(
    'default', 
    gulp.parallel(
        'start-browser-sync',
        gulp.series(
            'clear-dist', 
            'copy-script-to-dist',
            'copy-html-to-dist',
            'copy-convert-and-minify-main-style-to-dist', 
            'copy-minify-normalize-style-to-dist', 
            'copy-bootstrap-script-to-dist' 
        )
    )
);

gulp.task('watch', function(){
    gulp.watch('./src/views/**/*.html', gulp.parallel('copy-html-to-dist'));
    gulp.watch('./src/scss/**/*.scss', gulp.parallel('copy-convert-and-minify-main-style-to-dist'));
    gulp.watch('./src/js/main.js', gulp.parallel('copy-script-to-dist'));
});

gulp.task('run', gulp.parallel('watch','default'));