var gulp = require('gulp');
var sass = require('gulp-sass');
var htmlmin = require('gulp-htmlmin');
var autoprefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean');
var css = require('gulp-clean-css');
var concat = require('gulp-concat');
var rev = require('gulp-rev');
var collector = require('gulp-rev-collector');
var uglify = require('gulp-uglify');
var server = require('gulp-webserver');
var mock = require('mockjs');
var sequence = require('gulp-sequence');
var data = require('./src/data/data.json');
var fs = require('fs');
var url = require('url');
var path = require('path');
var options = {
    "removeComments": true,
    "collapseWhitespace": true,
    "collapseBooleanAttributes": true,
    "removeEmptyAttributes": true,
    "removeScriptTypeAttributes": true,
    "removeStyleLinkTypeAttributes": true,
    "minifyJS": true,
    "mibifyCss": true
};

gulp.task('server', function() {
    gulp.src('bulid')
        .pipe(server({
            port: 9080, 
            livereload: true,
            middleware: function(req, res, next) { 
                var Url = url.parse(req.url).pathname;
                if (Url === '/favicon.ico') {
                    return false;
                }
                if (Url === '/api/list') {
                    res.end(JSON.stringify(data));
                } else {
                    Url = Url === '/' ? 'index.html' : Url;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', Url)));
                }
                next();
            }
        }))
});

// 克隆 html
gulp.task("html", function() {
    return gulp.src(['rev/**/*.json', 'src/**/*.html'])
        .pipe(collector({
            replaceReved: true
        }))
        .pipe(htmlmin(options))
        .pipe(gulp.dest('./bulid'))
})

// 自己写的 js文件
gulp.task("js", function() {
    return gulp.src("src/js/**/*.js")
        .pipe(uglify())
        .pipe(gulp.dest('bulid/js'))
});

// 清空！
gulp.task("clean", function() {
    return gulp.src('./bulid')
        .pipe(clean())
})
gulp.task("img", function() {
    gulp.src('./src/img/*')
        .pipe(gulp.dest("./bulid/img"))
});

gulp.task("mincss", function() {
    gulp.src('./src/css/*.css')
        .pipe(gulp.dest("./bulid/css"))
});

// 克隆css   并且加密
gulp.task("css", function() {
    return gulp.src('./src/css/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers:["last 2 versions","Android >= 4.0"]
        }))
        .pipe(rev())
        .pipe(gulp.dest('./bulid/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./rev/css'))
})

gulp.task('default', function(ck) {
    sequence("clean", ["css", "js", "img","mincss"], "html", "server", ck)
})