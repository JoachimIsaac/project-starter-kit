


var gulp = require('gulp');

var sass = require('gulp-sass')(require('sass'));



const autoprefixer = require('gulp-autoprefixer');

var browsersync = require('browser-sync');
var reload = browsersync.reload;
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
const { src, dest } = require('gulp');
const { watch } = require('browser-sync');


var jsSRC = './src/js/script.js';
var jsPublic = './public/js';
var jsWatch = "./src/js/**/*.js";
var jsFiles = [jsSRC];



function buildStyles(cb) {
    gulp.src('./src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('./public/css')).pipe(browsersync.stream());
    cb();
};



function buildStylesMinify(cb) {
    gulp.src('./public/css/*.css')
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./public/css"));
    cb();
};



gulp.task('sass', buildStyles);
gulp.task('sass:minify', buildStylesMinify);

gulp.task('browser-sync',function (cb) {
    browsersync.init({
        server: "./public",
        notify: false,
        open:false
    })
    gulp.watch('./src/scss/**/*', gulp.series('sass'))
    // gulp.watch(jsWatch, bundleJS);
    cb();
})


gulp.task('production', gulp.series('sass:minify'));

gulp.task('default',gulp.series('sass','browser-sync'),function (cb) {
    cb();
});






