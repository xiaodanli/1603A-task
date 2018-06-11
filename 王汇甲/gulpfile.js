var gulp = require("gulp");
var sass = require("gulp-sass"); //编译scss
var autoprefixer = require("gulp-autoprefixer"); //自动添加前缀
var minCss = require("gulp-clean-css"); //压缩css
var uglify = require("gulp-uglify"); //压缩js
var htmlmin = require("gulp-htmlmin"); //压缩html
var server = require("gulp-webserver"); //起服务
var rev = require("gulp-rev"); //添加md5后缀
var collector = require("gulp-rev-collector"); //替换路径
var url = require("url");
var fs = require("fs");
var path = require("path");
var swiperData = require("./data/swiper.json");
var sequence = require("gulp-sequence"); //设置gulp任务的执行顺序
var clean = require("gulp-clean"); //删除文件
var babel = require("gulp-babel"); //编译es6语法  //babel-preset-es2015 
//起服务
gulp.task("server", ['devCss'], function() {
    gulp.src("build")
        .pipe(server({
            port: 9090, //配置端口号
            host: '169.254.250.192', //配置ip
            // open:true,	//自动打开浏览器
            livereload: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false
                }
                if (pathname === '/api/swiper') {
                    res.end(JSON.stringify(swiperData));
                } else {
                    pathname = pathname === '/' ? '/index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }

            }
        }))
})

gulp.task("devCss", function() {
    gulp.src("src/scss/*.scss")
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0']
        }))
        .pipe(minCss())
        .pipe(gulp.dest("src/css"))
})

//js

gulp.task("uglify", function() {
    return gulp.src("src/js/**/*.js", { base: 'src' })
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(gulp.dest("build"))
})

//html

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
    return gulp.src(["rev/**/*.json", "src/**/*.html"])
        .pipe(collector({
            replaceReved: true
        }))
        .pipe(htmlmin(options))
        .pipe(gulp.dest("build"))
})

//build css

gulp.task("buildCss", function() {
    return gulp.src("src/scss/*.scss")
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0']
        }))
        .pipe(minCss())
        .pipe(rev()) //添加后缀
        .pipe(gulp.dest("build/css"))
        .pipe(rev.manifest()) //生成映射文件
        .pipe(gulp.dest("rev/css")) //映射文件的存放路径
})

//build copyCss
gulp.task("copyCss", function() {
    return gulp.src("src/scss/*.css")
        .pipe(gulp.dest("build/css"))
})
gulp.task("clean", function() {
    return gulp.src("build")
        .pipe(clean())
})
gulp.task("watch", function() {
    gulp.watch("src/scss/*.scss", ["css"])
})
gulp.task("default", ['devCss', 'watch', 'server'])
gulp.task("build", function(cb) {
    sequence('clean', ['buildCss', 'copyCss'], 'uglify', 'htmlmin', cb)
})