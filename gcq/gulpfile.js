// gulp 插件
var gulp = require('gulp');
var server = require('gulp-webserver');

// 数据
var book = require('./data/list.json');
// url\path\fs
var url = require('url');
var path = require('path');
var fs = require('fs');


// 启服务
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 8800,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false
                }
                if (pathname === '/list') {
                    res.end(JSON.stringify(book))
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }
            }
        }))
})