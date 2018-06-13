var gulp = require('gulp');
var server = require('gulp-webserver');
var data = require('./data/data.json');

var fs = require('fs');
var path = require('path');
var url = require('url');

gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 8090,
            host: '169.254.108.144',
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false;
                }
                pathname = pathname === '/' ? '/index.html' : pathname;
                if (pathname === '/api/list') {
                    res.end(JSON.stringify(data));
                } else {
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }))
})