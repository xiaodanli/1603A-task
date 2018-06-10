// 引入gulp模块
var gulp = require('gulp');
// 编译sass文件
var Sass = require('gulp-sass');
// 压缩css文件
var CleanCss = require('gulp-clean-css');
// 压缩js文件
var Uglify = require('gulp-uglify');
// 自动添加前缀
var autoprefixer = require('gulp-autoprefixer');
// 压缩html文件
var HtmlMin = require('gulp-htmlmin');
// 合并文件
var Concat = require('gulp-concat');
// 删除指定文件
var Clean = require('gulp-clean');
// 起服务
var Server = require('gulp-webserver');
// 生成MD5随机数
var rev = require('gulp-rev');
// 替换路径
var collector = require('gulp-rev-collector');
// 设置gulp任务的执行顺序
var sequence = require('gulp-sequence');
// 编译es6语法
var babel = require('gulp-babel');
// json数据
var Datajson = require('./data/data.json')

var url = require('url')
var path = require('path')
var fs = require('fs')

gulp.task('server', ['sass'], function() {
    gulp.src('src')
        .pipe(Server({
            port: 8080,
            host: '169.254.207.254',
            open: true,
            livereload: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false;
                }
                if (pathname === '/api/swiper') {
                    res.end(JSON.stringify(Datajson));
                } else {
                    pathname = pathname === '/' ? '/index.html' : pathname;
                    if (pathname === '/js/swiper/swiper.min.js.map') {
                        return false;
                    }
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }
            },
            error: function(error) {
                console.warn(error)
            }
        }))
})

gulp.task('sass', function() {
    gulp.src('src/scss/*.scss')
        .pipe(Sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0']
        }))
        .pipe(CleanCss())
        .pipe(gulp.dest('src/css'))
})

gulp.task('uglify', function() {
    return gulp.src("src/js/**/*.js", { base: 'src' })
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(Uglify())
        .pipe(gulp.dest("build"))
})

var options = {
    // removeComments: true, //清除HTML注释
    collapseWhitespace: true //压缩HTML
        // collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
        // removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
        // removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
        // removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
        // minifyJS: true, //压缩页面JS
        // minifyCSS: true //压缩页面CSS
};

gulp.task('htmlmin', function() {
    return gulp.src(["rev/**/*.json", "src/*.html"])
        .pipe(collector({
            replaceReved: true
        }))
        .pipe(HtmlMin(options))
        .pipe(gulp.dest("build"))
})

gulp.task("buildCss", function() {
    return gulp.src("src/scss/*.scss")
        .pipe(Sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0']
        }))
        .pipe(HtmlMin())
        .pipe(rev()) //添加后缀
        .pipe(gulp.dest("build/css"))
        .pipe(rev.manifest()) //生成映射文件
        .pipe(gulp.dest("rev/css")) //映射文件的存放路径
})

gulp.task("clean", function() {
    return gulp.src("build")
        .pipe(Clean())
})

gulp.task("copyCss", function() {
    return gulp.src("src/scss/*.css")
        .pipe(gulp.dest("build/css"))
})

gulp.task("watch", function() {
    gulp.watch("src/scss/*.scss", ["css"])
})

gulp.task("default", ['sass', 'watch', 'server'])

gulp.task("build", function(cb) {
    sequence('clean', ['buildCss', 'copyCss'], 'uglify', 'htmlmin', cb)
})