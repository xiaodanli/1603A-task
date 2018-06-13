var gulp = require('gulp');
var server = require('gulp-webserver');
var fs = require('fs');
var url = require('url');
var path = require('path');
var data = require('./data/data.json');
console.log(data);
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 9090,
            open: true,
            livereload: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false;
                }
                if (pathname === '/api/list') {
                    res.end(JSON.stringify(data))
                }
                next();
            }
        }))
})