var gulp = require('gulp');
var server = require('gulp-webserver');
var url = require('url');
var fs = require('fs');
var path = require('path');
var data = require('./data/list.json');
//起服务
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 8888,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false;
                }
                if (pathname === '/api/list') { //ajax请求
                    res.end(JSON.stringify(data));
                } else {
                    if (pathname === '/') {
                        pathname = '/index.html'
                    } else {
                        pathname = pathname;
                    }
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }

            }
        }))
})