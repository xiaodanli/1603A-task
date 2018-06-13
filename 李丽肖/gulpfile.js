var gulp = require('gulp');
var server = require('gulp-webserver')
var path = require('path');
var url = require('url');
var fs = require('fs');
var data = require('./data/list.json')
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 8080,
            // open: true,
            // livereload: true,
            middleware: function(req, res) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return
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