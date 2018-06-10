var gulp = require('gulp');
var sass = require('gulp-sass'); //编译scss
var autoprefixer = require('gulp-autoprefixer'); //自动添加前缀
var mincss = require('gulp-clean-css'); //压缩css
var uglify = require('gulp-uglify'); //压缩js
var htmlmin = require('gulp-htmlmin'); //压缩html
var server = require('gulp-webserver'); //起服务
var rev = require('gulp-rev'); //添加md5后缀
var collector = require('gulp-rev-collector'); //替换路径
var url = require('url');
var path = require('path');
var fs = require('fs');
var swiperData = require('./data/swiper.json');
var sequence = require('gulp-sequence'); //设置gulp任务的执行任务
var clean = require('gulp-clean'); //删除文件
var babel = require('gulp-babel'); //编译es6语法 

gulp.task('server', ['devcss'], function() {
    gulp.src('bulid')
        .pipe(server({
            port: 9090,
            open: true,
            livereload: true, //自动刷新浏览器
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname
                if (pathname === "/favicon.ico") {
                    return false
                }
                if (pathname === '/list/api') {
                    res.end(JSON.stringify(swiperData))
                } else {
                    pathname = pathname === '/' ? '/index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }))
});
//bulid copycss swiper
gulp.task('copycss', function() {
    gulp.src('src/scss/*.css')
        .pipe(gulp.dest('bulid/css'))
});
//编译scss 压缩css
gulp.task('devcss', function() {
    gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0']
        }))
        .pipe(mincss())
        .pipe(gulp.dest('src/css'))
});
//打包css
gulp.task('bulidcss', function() {
    return gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0']
        }))
        .pipe(mincss())
        .pipe(rev())
        .pipe(gulp.dest('bulid/css'))
        .pipe(rev.manifest()) //生成映射文件
        .pipe(gulp.dest("rev/css")) //映射文件路径
})

gulp.task('clean', function() {
    return gulp.src('bulid')
        .pipe(clean())
});
//打包js
gulp.task('uglify', function() {
    return gulp.src("src/js/**/*.js", { base: 'src' })
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('bulid'))
});
//压缩html文件配置
var options = {
    collapseWhitespace: true
};
//html
gulp.task('htmlmin', ['bulidcss'], function() {
    gulp.src(["rev/**/*.json", "src/**/*.html"])
        .pipe(collector({
            replaceReved: true
        }))
        .pipe(htmlmin(options))
        .pipe(gulp.dest('bulid'))
})

gulp.task('watch', function() {
    gulp.watch('src/scss/*.scss', ['css'])
})

gulp.task('default', ['devcss', 'watch', 'server'])

gulp.task('bulid', function(cd) {
    sequence('clean', ['bulidcss', 'copycss'], 'uglify', 'htmlmin', 'server', cd)
})