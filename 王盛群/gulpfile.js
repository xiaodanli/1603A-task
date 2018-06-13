var gulp = require('gulp');
var server = require('gulp-webserver');
var list = require('./data/list.json');
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 8080,
            middleware: function(req, res, next) {
                var pathname = require('url').parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false;
                }
                if (pathname === '/api/list') {
                    res.end(JSON.stringify(list));
                } else {
                    pathname = pathname === '/' ? '/handlebars.html' : pathname;
                    res.end(require('fs').readFileSync(require('path').join(__dirname, 'src', pathname)));
                }
            }
        }))
})