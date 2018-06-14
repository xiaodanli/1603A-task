var gulp = require('gulp');

var server = require('gulp-webserver');

var info = require('./src/js/info.json');

gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 8080,
            open: true,
            middleware: function(req, res, next) {
                if (req.url === '/login') {
                    res.setHeader('Content-Type', 'charset=utf-8;text/json');
                    res.end(JSON.stringify(info));
                } else if (req.url === '/info') {
                    res.setHeader('Content-Type', 'charset=utf-8;text/json');
                    res.end(JSON.stringify(public));
                }
                next();
            }
        }))
});