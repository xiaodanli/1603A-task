var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var autoPrefixer = require('gulp-autoprefixer');
var minCss = require('gulp-clean-css');
var server = require('gulp-webserver');
var rev = require('rev');
var path = require('path');
var fs = require('fs');
//css
gulp.task('sass', function() {
    gulp.src('./src/css/*.css')
        .pipe(sass())
        .pipe(autoPrefixer({
            browsers: ['last 2 versions', 'Android >= 4.0']
        }))
        .pipe(minCss())
        .pipe(gulp.dest('bulid/css'));
});
//映射
gulp.task('sass', function() {
    gulp.src('./src/css/*.css')
        .pipe(sass())
        .pipe(autoPrefixer({
            browsers: ['last 2 versions', 'Android >= 4.0']
        }))
        .pipe(minCss())
        .pipe(rev())
        .pipe(gulp.dest('bulid/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/css'));
});
//js
gulp.task('uglify', function() {
    gulp.src('./src/lib/main.js')
        .pipe(uglify())
        .pipe(gulp.dest('bulid/lib'))
});
//copy
gulp.task('copy', function() {
    gulp.src('./src/lib/*')

    .pipe(gulp.dest('bulid/lib'));
});
//server
gulp.task('server', function() {
    gulp.src('./src')
        .pipe(server({
            port: 8080,
            open: true,
            fallback: 'index.html',
            livereload: true,
            middlewear: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false;
                }
                if (pathname === '/data/swiper') {
                    res.end(JSON.stringify(swiperData));
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', 'index.html')));
                }
            }
        }))
})
gulp.task('watch', function() {

})
gulp.task('default', ['sass', 'uglify', 'copy', 'server'])