var gulp = require('gulp');
var server = require('gulp-webserver');
var fs = require('fs');
var path = require('path');
var url = require('url');
var data = require('./data/data.json');
//起服务
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 8090,
            //open: true,
            livereload: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false;
                }
                if (pathname === '/api/data') {
                    res.end(JSON.stringify(data));
                } else {
                    pathname = pathname === '/' ? '/index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
                // if (req.url === '/api/data') {
                //     res.end(JSON.stringify(data))
                // }
                // next()
            }
        }))
})