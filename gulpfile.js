var gulp = require('gulp');
var server = require('gulp-webserver');
var path = require('path');
var fs = require('fs');
var url = require('url');
var babel = require('gulp-babel');
var preset = require('babel-preset-es2015');
var data = require('./team5/data/list.json');
gulp.task('server', function() {
    gulp.src('./team5/src')
        .pipe(server({
            port: 9090,
            open: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;

                if (pathname === '/favicon.ico') {
                    return false;
                }
                if (pathname === '/api/server') {
                    res.end(JSON.stringify(data))
                } else {
                    pathname = pathname === '/' ? '/index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'team5', 'src', pathname)));
                }

            }
        }))
})