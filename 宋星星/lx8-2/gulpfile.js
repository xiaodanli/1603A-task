var gulp = require('gulp');
var server = require('gulp-webserver');
var fs = require('fs');
var path = require('path');
var url = require('url');
var data = require('./data/data.json');
gulp.task('server',function(){
    gulp.src('src').pipe(server({
        port: 8082,
        middleware: function (req, res, next) {
            var pathname = url.parse(req.url).pathname;
            if (pathname === '/favicon.ico') {
                return;
            }
            if (pathname === '/api/list') {
                res.end(JSON.stringify(data));
            } else {
                pathname = pathname === '/' ? '/index.html' : pathname;
                res.end(fs.readFileSync(path.join(__dirname,'src',pathname)));
            }
        }
    }))
});