var gulp = require('gulp');
var server = require('gulp-webserver');
var sass = require('gulp-sass');

var path = require('path');
var url = require('url');
var fs = require('fs');

gulp.task('sass', function() {
    gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/css'))
});
gulp.task('watch', function() {
    gulp.watch('./src/scss/*.scss', ['css'])
});
//起服务
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 8888,
            livereload: true,
            middleware: function(req, res, next) {
                if (req.url === '/favicon.ico') {
                    return;
                }
                var pathname = url.parse(req.url).pathname;
                pathname = pathname === '/' ? '/index.html' : pathname;
                res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
            }
        }))
})
gulp.task('default', ['watch', 'sass', 'server'])