var gulp = require('gulp');
var webserver = require('gulp-webserver');
var fs = require('fs');
var path = require('path');
var url = require('url');
gulp.task('webserver', function() {
    gulp.src('src')
        .pipe(webserver({
            port: '8080',
            host: '169.254.200.15',
            fallback: 'index3.html',
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false;
                }
                if (pathname === '/list') {
                    res.end(fs.readFileSync(path.join(__dirname, 'src', 'data', 'data.json')))
                } else {
                    pathname = pathname === '/' ? 'index3.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }
            }
        }))
})