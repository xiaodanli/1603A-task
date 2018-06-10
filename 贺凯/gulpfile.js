var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var mincss = require('gulp-clean-css');
var server = require('gulp-webserver');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var rev = require('gulp-rev');
var collector = require('gulp-rev-collector');
var clean = require('gulp-clean');

var path = require('path');
var url = require('url');
var fs = require('fs');
//开发版本的css
gulp.task('devcss', function() {
    gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0']
        }))
        .pipe(mincss())
        .pipe(gulp.dest('src/css'))
});

gulp.task('buildcss', function() {
    gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0']
        }))
        .pipe(mincss())
        .pipe(rev())
        .pipe(gulp.dest('build/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/css'))
});
//起服务
gulp.task('server', ['devcss'], function() {
    gulp.src('build')
        .pipe(server({
            port: 8888,
            livereload: true,
            middleware: function(req, res, next) {
                if (req.url === '/favicon.ico') {
                    return;
                }
                var pathname = url.parse(req.url).pathname;
                pathname = pathname === '/' ? 'index.html' : pathname
                res.end(fs.readFileSync(path.join(__dirname, 'build', pathname)))
            }
        }))
})

//压缩js
gulp.task('js', function() {
    gulp.src('src/js/**/*.js', { base: 'src' })
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('build'))
})

//压缩html
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

gulp.task('minhtml', function() {
        gulp.src(['rev/css/*.json', 'src/**/*.html'])
            .pipe(collector({
                replaceReved: true
            }))
            .pipe(htmlmin(options))
            .pipe(gulp.dest('build'))
    })
    // gulp.task('clean', function() {
    //     gulp.src('build')
    //         .pipe(clean())
    // })
gulp.task('default', ['buildcss', 'js', 'minhtml', 'server'])