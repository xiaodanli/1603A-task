var gulp = require('gulp');
var server = require('gulp-webserver');

var path = require('path');
var fs = require('fs');
var url = require('url')

var json = require('./data/data.json')

gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 8080,
            open: true,
            livereload: true,
            middleware: function(req, res, next) {
                if (req.url === '/favicon.ico') {
                    return;
                }
                var pathname = url.parse(req.url).pathname
                if (pathname === '/carous') {
                    res.end(JSON.stringify(json))
                } else {
                    if (pathname === '/js/libs/swiper.min.js.map') {
                        return;
                    }
                    pathname = pathname === '/' ? '/index.html' : pathname
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }
            }
        }))
})