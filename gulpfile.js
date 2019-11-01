const gulp = require("gulp");
const webserver = require('gulp-webserver');
const mainBowerFiles = require('main-bower-files');
const bowerNormalize = require('gulp-bower-normalize');
const watch = require('gulp-watch');
const clean = require('gulp-clean');
const sass = require('gulp-sass');
const runTask = require('gulp-runtask');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const tsify = require('tsify')
const tinyify = require('tinyify')
const rename = require('gulp-rename');
const path = require('path');
const es = require('event-stream');
const glob = require('glob');

sass.compiler = require('node-sass');
/**
 * Start Http Server
 */
gulp.task('serve', () => {
    return gulp.src('./app')
        .pipe(webserver({
            host: '127.0.0.1',
            port: '3011',
            livereload: true,
            open: true
        }));
});
/**
 * Copy Bower Components
 */
gulp.task('bower', () => {
    return gulp.src(mainBowerFiles(), { base: './bower_components'})
            .pipe(bowerNormalize({ 
                bowerJson: './bower.json' 
            }))
            .pipe(gulp.dest('./app/vendor'));
});
/**
 * Delete Built Files
 */
gulp.task('clean', () => {
    return gulp.src('./dist/**/*')
            .pipe(clean({force: true}));
});
/**
 * Watch File Change
 */
gulp.task('watch', () => {
    return watch(['./src/**/*'], () => {
        runTask('rebuild');
    });
});
/**
 * Scss Complier
 */
gulp.task('sass', function () {
    return gulp.src('./scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'))
        .pipe(gulp.dest('./app/styles'));
});
/**
 * Script Complier
 */
gulp.task('scripts', function(done) {
    var files = [
        'src/main.ts', 
        'src/pages/index.ts',
        'src/pages/modal.ts'
    ];

    var tasks = files.map(function(entry) {
        return browserify({ 
                basedir: '.',
                entries: [entry],
                debug: true
            })
            .plugin(tsify)
            .plugin(tinyify)
            .bundle()
            .pipe(source(entry.replace(/^src\//, '')))
            .pipe(rename({
                extname: '.js'
            }))
            .pipe(gulp.dest('./app/scripts'))
            .pipe(gulp.dest('./dist/js'));
        });
    return es.merge.apply(null, tasks).on('end', done);
});
/**
 * Copy Test Html
 */
gulp.task('copy-html', () => {
    return gulp.src('./html/**/*.html')
            .pipe(gulp.dest('./app'));
});
/**
 * Rebuild All Script & Css
 */
gulp.task('rebuild', gulp.series('clean', gulp.parallel('scripts', 'sass')));
/**
 * Rebuild Script & Css And Start Server & Watch
 */
gulp.task('start', gulp.series(
    gulp.parallel('rebuild', 'copy-html'),
    gulp.parallel('serve', 'watch')
));

