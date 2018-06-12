var gulp = require('gulp');
var server = require('gulp-webserver');
var path = require('path');
var url = require('url');
var fs = require('fs');
var data = require('./src/data/data.json');

gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 8888,
            host: '169.254.210.46',
            open: true,
            lieveload: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (req.url === '/favicon.ico') {
                    return;
                }
                if (pathname === '/index') {
                    res.end(JSON.stringify(data));
                } else {
                    pathname = pathname === '/' ? '/index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }))
});