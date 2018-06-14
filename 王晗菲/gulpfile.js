var gulp = require('gulp'); // 引入gulp
var server = require('gulp-webserver'); // 引入启动服务插件
var path = require('path');
var fs = require('fs');
var url = require('url');
var data = require('./data/list.json'); // 引入data下面的json数据
// 启服务
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 9090,
            open: true,
            middleware: function(req, res, next) { // 拦截前端请求
                var pathname = url.parse(req.url).pathname; // 找出代表路径的部分
                if (pathname === '/favicon.ico') {
                    return false;
                }
                if (pathname === '/api/list') { // 判断是否为定义的接口
                    res.end(JSON.stringify(data)) // 响应对应数据
                } else {
                    pathname = pathname === '/' ? '/index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname))); // 读取相应文件
                }

            }
        }))
})