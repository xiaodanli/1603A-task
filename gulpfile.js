var gulp = require('gulp');
<<<<<<< HEAD
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var minCss = require('gulp-clean-css');
var rev = require('gulp-rev');
var collector = require('gulp-rev-collector');
var htmlmin = require('gulp-htmlmin');
var server = require('gulp-webserver');
var fs = require('fs');
var path = require('path');
var clean = require('gulp-clean');
var sequence = require('gulp-sequence');
var url = require('url');
var datajson = require('./data/data.json');
var babel = require('gulp-babel');

//起服务
gulp.task('server', function() {
    gulp.src('build')
        .pipe(server({
            port: 8080,
            // host: '169.254.81.103',
            open: true,
            livereload: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false
                }
                if (pathname === '/list') {
                    res.end(JSON.stringify(datajson))
                } else {
                    pathname = pathname === '/' ? '/index.html' : pathname
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }
                next();

            }
        }))
})

//
gulp.task('devSass', function() {
    gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android>=4.0']
        }))
        .pipe(minCss())
        .pipe(gulp.dest('src/css'))
})
gulp.task('buildSass', function() {
    return gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android>=4.0']
        }))
        .pipe(minCss())
        .pipe(rev())
        .pipe(gulp.dest('build/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/css'))
})


//js

gulp.task('uglify', function() {
    return gulp.src('src/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('build'))
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
//压缩html
gulp.task('htmlmin', function() {
    return gulp.src(['rev/**/*.json', 'src/**/*.html'])
        .pipe(collector({
            replaceReved: true
        }))
        .pipe(htmlmin(options))
        .pipe(gulp.dest('build'))
})

//监听sass
gulp.task('watch', function() {
    gulp.watch('src/scss/*.scss', ['sass'])

})

//每次打开时清除一次build
gulp.task('clean', function() {
    return gulp.src('build')
        .pipe(clean())
})

//把swipercss复制到build
gulp.task('swipercss', function() {
    return gulp.src('src/scss/*.css')
        .pipe(gulp.dest('build/css'))
})

gulp.task('default', ['devSass', 'watch', 'server'])

gulp.task('build', function(cb) {
    sequence('clean', ['buildSass', 'swipercss'], 'uglify', 'htmlmin', cb)
=======
var sass = require('gulp-sass'); //编译sass
var autoprefixer = require('gulp-autoprefixer'); //自动添加前缀
var mincss = require('gulp-clean-css') //压缩css
var htmlmin = require('gulp-htmlmin'); //压缩html文件
var server = require('gulp-webserver'); //起服务
var rev = require('gulp-rev'); //添加md5路径
var collector = require('gulp-rev-collector'); //替换路径
var url = require('url');
var path = require('path');
var fs = require('fs');
//var swpreData = require('./data/data.json') //引入json文件
var sequence = require('gulp-sequence'); //设置gulp任务的执行顺序


gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 8080,
            open: true,
            livereload: true
                // middleware: function(req, res, next) {

            // }
        }));
});
gulp.task('srt', function() {
    console.log(11);
>>>>>>> 54b443c70adc80c7113501dac3db6d6852552bfa
})