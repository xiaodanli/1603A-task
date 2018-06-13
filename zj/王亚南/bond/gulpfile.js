var gulp = require('gulp');

var server = require('gulp-webserver');

// 路径
var path = require('path');
var fs = require('fs');
var url = require('url');

// json数据
var data = require('./data/data.json');

// 起服务
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 9191,
            livereload: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false;
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