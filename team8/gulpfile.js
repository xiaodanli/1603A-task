var gulp = require('gulp');
var server = require('gulp-webserver');
var sass = require('gulp-sass');
var sequence = require('gulp-sequence');


var listJson = require('./src/data/list.json');
var topJson = require('./src/data/list-top.json')
var url = require('url');
var path = require('path');
var fs = require('fs');
gulp.task('server', function() {
    return gulp.src('src')
        .pipe(server({
            port: 8880,
            open: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false
                }
                if (pathname === '/list') {
                    res.end(JSON.stringify(listJson))
                }
                if (pathname === '/listTop') {
                    res.end(JSON.stringify(topJson))
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }

            }
        }))
})
gulp.task('sass', function() {
    return gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/css'))
})
gulp.task('watch', function() {
    return gulp.watch('src/scss/*.scss', ['sass'])
})

gulp.task('default', function(cb) {
    sequence('watch', 'sass', 'server', cb)
})