const gulp = require('gulp'),
    server = require('gulp-webserver'),
    fs = require('fs'),
    path = require('path'),
    url = require('url'),
    data = require('./data/data.json')


gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            host: 'localhost',
            port: 8888,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url, true).pathname;
                if (pathname === '/favicon.ico') {
                    return false
                }
                if (pathname === '/app/text') {
                    res.end(JSON.stringify(data))
                } else {
                    pathname = pathname == '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }
            }
        }))
})
gulp.task('default', ['server'])