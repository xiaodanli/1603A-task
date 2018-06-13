var gulp = require('gulp');
var server = require('gulp-webserver');

var path = require('path');
var fs = require('fs');
var url = require('url');

gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 8888,
            open: true,
            fallback: 'index3.html',
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false;
                }
                if (pathname === '/api/list') {
                    res.end(fs.readFileSync(path.join(__dirname, 'data', 'list.json')))
                } else {
                    pathname = pathname === '/' ? '/index3.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }

            }
        }))
})