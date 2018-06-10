var gulp = require('gulp');
var server = require("gulp-webserver");
var scss = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minCss = require("gulp-clean-css");
var htmlmin = require("gulp-htmlmin");
var uglify = require('gulp-uglify');
var rev = require("gulp-rev");
var collector = require("gulp-rev-collector");
var path = require('path');
var url = require('url');
var fs = require("fs");
var swiperData = require('./data/data.json')
gulp.task('server', ['devCss'], function() {
    gulp.src('src')
        .pipe(server({
            port: 8989,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false
                }
                if (pathname === '/api/list') {
                    res.end(JSON.stringify(swiperData))
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }

            }
        }))
})
gulp.task('devCss', function() {
    gulp.src('src/sass/*.scss')
        .pipe(scss())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0']
        }))
        .pipe(minCss())
        .pipe(gulp.dest('build/css'))
});
gulp.task('uglify', function() {
    gulp.src('src/js/**/*.js', { base: 'src' })

    .pipe(uglify())
        .pipe(gulp.dest('build/js'))
})
var opation = {
    collapseWhitespace: true
}
gulp.task('htmlmin', ['buildCss'], function() {
    gulp.src(["rev/**/*.json", 'src/**/*.html'], { base: 'src' })
        .pipe(collector({
            relaceReved: true
        }))
        .pipe(htmlmin(opation))
        .pipe(gulp.dest('build'))
})
gulp.task('buildCss', function() {
    gulp.src('src/sass/*.scss')
        .pipe(scss())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0']
        }))
        .pipe(minCss())
        .pipe(rev())
        .pipe(gulp.dest('build/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/css'))
});
gulp.task("watch", function() {
    gulp.watch('src/sass/*.scss', ['devCss'])
})
gulp.task('default', ['htmlmin', 'devCss', 'uglify', 'watch', 'server', 'buildCss'])