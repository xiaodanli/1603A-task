var gulp = require('gulp');
var server = require('gulp-webserver');
var fs = require('fs');
var path = require('path');
var index = require('./data/index.json')
var url = require('url');
//起服务
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 8090,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false;
                }
                if (pathname === '/api/index') {
                    res.end(JSON.stringify(index))
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }

            }
        }))
})