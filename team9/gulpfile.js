var gulp = require('gulp');
var server = require('gulp-webserver');
var fs = require('fs');
var url = require('url');
var path = require('path');
var data = require('./data/data.json')
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 8080,
            open: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false;
                }
                if (pathname === '/data') {
                    res.end(JSON.stringify(data));
                } else {
                    if (pathname === '/') {
                        pathname = '/index.html';
                    } else {
                        pathname = pathname;
                    }
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }

            }
        }))
})