var gulp = require('gulp');
var sass = require('gulp-sass'); //编辑scss文件
var cleancss = require('gulp-clean-css'); //压缩css文件
var uglify = require('gulp-uglify'); //压缩js文件
var htmlmin = require('gulp-htmlmin'); //压缩html文件
var auto = require('gulp-autoprefixer'); //自动添加前缀
var clean = require('gulp-clean'); //删除指定文件
var concat = require('gulp-concat'); //合并文件（所有）
var server = require('gulp-webserver'); //起服务
var path = require('path');
var url = require('url');
var fs = require('fs');
var rev = require("gulp-rev"); //添加md5后缀
var collector = require("gulp-rev-collector"); //替换路径
var swiperData = require("./data/swiper.json");
var sequence = require('gulp-sequence'); //设置gulp人物的执行顺序

//压缩css sass  自动添加前缀
gulp.task('sass', function() {
    gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(auto({
            browsers: ['last 2 versions', 'Android >= 4.0']
        }))
        .pipe(cleancss())
        .pipe(gulp.dest('src/css'))
});
//压缩的HTML的变量
var options = {
    collapseWhitespace: true //压缩HTML
};
//压缩html
gulp.task('htmlmin', function() {
    gulp.src(['rev/**/*.json', 'src/**/*.html'])
        .pipe(collector({
            replaceReved: true
        }))
        .pipe(htmlmin(options))
        .pipe(gulp.dest('bulid'))
});
//增加MD5后缀 
gulp.task('buildCss', function() {
    gulp.src('src/scss/*scss')
        .pipe(sass())
        .pipe(auto({
            browsers: ['last 2 versions', 'Android >= 4.0']
        }))
        .pipe(cleancss())
        .pipe(rev())
        .pipe(gulp.dest('bulid/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/css'))
});
//起服务
gulp.task('server', ['sass'], function() {
    gulp.src('bulid')
        .pipe(server({
            port: 9090, //配置端口号
            open: true, //自动打开浏览器
            host: '169.254.34.23', //配置ip
            fallback: 'index.html', //指定路径
            livereload: true, //自动刷新
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false;
                }
                if (pathname === '/api/swiper') {
                    res.end(JSON.stringify(swiperData));
                } else {
                    pathname = pathname === '/' ? '/index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }))
});

//删除文件
gulp.task('clean', function() {
    gulp.src('bulid')
        .pipe(clean())
});

//监听文件
gulp.task("watch", function() {
    gulp.watch("src/scss/*.scss", ["css"])
});

//执行顺序
gulp.task("default", ['sass', 'watch', 'server']);

//设置任务的执行顺序
gulp.task("build", function(cb) {
    sequence('clean', ['buildCss'], 'htmlmin', cb)
})