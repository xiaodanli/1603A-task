var gulp = require('gulp');

var server = require('gulp-webserver');

var path = require('path');

var url = require('url');

var fs = require('fs');

var babel = require('gulp-babel');

var data = require('./src/data/data.json');

gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 8881,
            livereload: true, //自动刷新
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false;
                }
                if (pathname === '/api/src') {
                    res.end(JSON.stringify(data))
                } else {
                    pathname = pathname === '/' ? '/index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }))
})