var gulp = require('gulp');
var server = require('gulp-webserver');


var fs = require('fs');
var url = require('url');
var path = require('path');
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            prot: 80,
            open: true,
            livereload: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false;
                }
                pathname = pathname === '/' ? 'index.html' : pathname;
                if (pathname === '/app/list') {
                    var data = require('./src/json/data.json');
                    res.end(JSON.stringify(data))
                } else {
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }
            }
        }))
})