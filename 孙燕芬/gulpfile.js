var gulp = require('gulp');
var server = require('gulp-webserver');

// json 数据
var data = require('./data/index.json')

var fs = require('fs');
var path = require('path');
var url = require('url');

// 启动服务
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 8090,
            open: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false;
                }

                if (pathname === '/api') {
                    res.end(JSON.stringify(data))
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));

                }

            }
        }))
})