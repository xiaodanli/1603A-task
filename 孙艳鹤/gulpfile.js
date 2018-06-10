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

var swiperData = require("./data/data.json");
var sequence = require("gulp-sequence"); //设置gulp任务的执行顺序
var clean = require("gulp-clean"); //删除文件
var babel = require("gulp-babel"); //编译es6语法  //babel-preset-es2015

//样式
// gulp.task('sass', function() {
//     gulp.src('src/scss/*.scss')
//         .pipe(sass())
//         .pipe(autoprefixer({
//             browsers: ['last 2 versions', 'Android >= 4.0']
//         }))
//         .pipe(minCss())
//         .pipe(gulp.dest('src/css'))
// });
// //压缩js
// gulp.task('uglify', function() {
//     return gulp.src('src/js/*.js')
//         .pipe(babel({
//             presets: ['es2015']
//         }))
//         .pipe(uglify())
//         .pipe(gulp.dest('build/js'))
// });
//启服务
gulp.task('server', ['buildsass', 'copyCss', 'builduglify', 'htmlmin'], function() {
    return gulp.src('build')
        .pipe(server({
            port: 8888,
            host: '169.254.85.102',
            open: true,
            livereload: true,
            fallback: 'index.html',
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false;
                }
                if (pathname === '/api/list') {
                    res.end(JSON.stringify(swiperData));
                } else {
                    pathname = pathname === '/' ? '/index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }
            }
        }))
});
gulp.task('buildsass', function() {
    return gulp.src('src/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0']
        }))
        .pipe(minCss())
        .pipe(rev())
        .pipe(gulp.dest('build/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/css'))
});
//打包
gulp.task('builduglify', function() {
    return gulp.src('src/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('build/js'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/js'))
});
//压缩html
var opation = {
    collapseWhitespace: true,
    minifyJS: true,
    minifsCSS: true
}
gulp.task('htmlmin', function() {
    return gulp.src(['rev/**/*.json', 'src/**/*.html'])
        .pipe(collector({
            presets: ['es2015']
        }))
        .pipe(htmlmin(opation))
        .pipe(gulp.dest('build'))
});
gulp.task("watch", function() {
    gulp.watch("src/scss/*.scss", ["sass"])
});
gulp.task("copyCss", function() {
    return gulp.src("src/**/*.css")
        .pipe(gulp.dest("build/css"))
});
gulp.task("clean", function() {
    return gulp.src("build")
        .pipe(clean())
});
// gulp.task("build", function(cb) {
//     sequence('clean', 'server', , cb)
// })