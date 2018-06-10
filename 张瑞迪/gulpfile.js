var gulp = require('gulp');
var sass = require('gulp-sass'); //编译scss
var autoprefixer = require('gulp-autoprefixer'); //加前缀
var minCss = require("gulp-clean-css"); //压缩css
var uglify = require("gulp-uglify"); //压缩js
var htmlmin = require("gulp-htmlmin"); //压缩html
var server = require('gulp-webserver'); //起服务
var rev = require("gulp-rev"); //添加md5后缀
var collector = require('gulp-rev-collector'); //替换路径
var path = require('path');
var fs = require('fs');
var url = require('url');
//var babel = require('gulp-babel'); //es5-se6
var clean = require('gulp-clean'); //删除文件
var sequence = require('gulp-sequence'); //设置gulp的执行顺序

//本地css
gulp.task("devCss", function() {
    gulp.src("src/scss/*.scss")
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0']
        }))
        .pipe(minCss())
        .pipe(gulp.dest("src/css"))
});
//bulid中的css
gulp.task('bulidCss', function() {
    gulp.src("src/css/*.css")
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ["last 2 versions", "Android>=4.0"]
        }))
        .pipe(minCss())
        .pipe(rev()) //增加后缀
        .pipe(gulp.dest("bulid/css"))
        .pipe(rev.manifest()) //生成映射文件
        .pipe(gulp.dest("rev/css")) //映射文件存放路径

});
//js
gulp.task('bulidJs', function() {
    gulp.src('src/js/**/*.js', )
        // .pipe(babel({
        //     presets: ['es2015']
        // }))
        .pipe(uglify())
        .pipe(gulp.dest('bulid/js'))
});
//html
var options = {
    collapseWhitespace: true,
    minifyJS: true,
    minifyCSS: true
}
gulp.task('bulidHtml', function() {
    gulp.src(['rev/**/*.json','src/**/*.html'])
        .pipe(collector({
            replaceReved: true
        }))
        .pipe(htmlmin(options))
        .pipe(gulp.dest("bulid"))
});
//删除文件
gulp.task("clean", function() {
    return gulp.src("build")
        .pipe(clean())
})

gulp.task("watch", function() {
    gulp.watch("src/scss/*.scss", ["css"])
})
//起服务
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 8080, //配合端口号
            open: true, //自动打开浏览器
            livereload: true, //自动刷新浏览器
            fallback: 'index.html', //指定默认打开的浏览器
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false;
                }
                pathname = pathname === '/' ? '/index.html' : pathname;
                res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
            }
        }))
});
gulp.task("default", ['devCss', 'bulidCss', 'bulidJs', 'watch', 'bulidHtml', 'server'])

// gulp.task("build", function(cb) {
//     sequence('clean', ['buildCss', 'copyCss'], 'uglify', 'htmlmin', cb)
// })