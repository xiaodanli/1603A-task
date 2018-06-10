// 引入
var gulp = require('gulp');
var sass = require('gulp-sass'); // 编译scss文件
var autoprefixer = require('gulp-autoprefixer'); // 自动添加前缀 
var minCss = require('gulp-clean-css'); // 压缩css文件
var uglify = require('gulp-uglify'); // 压缩js文件
var concat = require('gulp-concat'); // 合并文件
var clean = require('gulp-clean'); // 删除指定文件
var htmlmin = require('gulp-htmlmin'); // 压缩html文件
var webserver = require('gulp-webserver'); // 启服务
var rev = require('gulp-rev'); // 在文件名后生成MD5随机数
var collector = require('gulp-rev-collector'); // 替换文件路径
var babel = require("gulp-babel"); //编译es6语法
var data = require('./data/data.json');
var path = require('path');
var url = require('url');
var fs = require('fs');
// 编译sass文件并执行自动添加前缀
gulp.task('sass', function() {
    gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0']
        }))
        .pipe(gulp.dest('build/scss'));
});
// 压缩css文件
gulp.task('minCss', function() {
    gulp.src('src/scss/*.css')
        .pipe(minCss())
        .pipe(gulp.dest('build/css'))
});
// 合并文件并压缩js文件
gulp.task('uglify', function() {
    gulp.src(['src/js/*.js', '!src/js/*.min.js'])
        .pipe(concat('script.js'))
        .pipe(rev()) // 给引入的js文件生成MD5随机数
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))
        .pipe(rev.manifest()) // 生成引入js文件的映射文件
        .pipe(gulp.dest('rev/js'))
});
// 删除文件
gulp.task('clean', function() {
        gulp.src('build')
            .pipe(clean())
    })
    // 压缩html文件
var options = {
    removeComments: true, //清除HTML注释
    collapseWhitespace: true, //压缩HTML
    collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
    minifyJS: true, //压缩页面JS
    minifyCSS: true //压缩页面CSS
};

gulp.task('htmlmin', ['clean', 'uglify'], function() {
    gulp.src(['rev/**/*.json', 'src/*.html'])
        .pipe(collector({
            replaceReved: true // 自动替换文件必要属性
        }))
        .pipe(htmlmin(options))
        .pipe(gulp.dest('build'))
})

// 启服务
gulp.task('webserver', function() {
    gulp.src('src')
        .pipe(webserver({
            port: 9090,
            open: true,
            fallback: 'index.html', //指定默认打开的文件
            livereload: true, //自动刷新浏览器
            middleware: function(req, res, next) { //拦截前端请求
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return;
                }
                if (pathname === '/api/list') {
                    res.end(JSON.stringify(data));
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }))
})