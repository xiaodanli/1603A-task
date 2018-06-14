var gulp = require('gulp');
var server = require('gulp-webserver');
var fs = require('fs');
var url = require('url');
var path = require('path');
var data = require('./src/data/data.json')
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: '8080',
            open: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false;
                }
                if (pathname == '/api/list') {
                    res.end(JSON.stringify(data))
                } else {
                    pathname = pathname === '/' ? "/index.html" : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }))
})