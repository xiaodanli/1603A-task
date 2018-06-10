var gulp = require('gulp');
var sass = require('gulp-sass');
var mincss = require('gulp-clean-css');
var server = require('gulp-webserver');
var es = require('gulp-babel');
var uglify = require('gulp-uglify');
var preset = require('babel-preset-es2015');
var auto = require('gulp-autoprefixer');
var rev = require('gulp-rev');
var collector = require('gulp-rev-collector');
var sequence = require('gulp-sequence');
var htmlmin = require('gulp-htmlmin');
var clean = require('gulp-clean')
var path = require('path');
var url = require('url');
var data = require('./data/data.json');
var fs = require('fs');
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
//操作css
gulp.task('css', function() {
    return gulp.src('src/sass/*.scss')
        .pipe(sass())
        .pipe(auto({
            browsers: ['last 2 versions', 'Android>=4.0']
        }))
        .pipe(mincss())
        .pipe(rev())
        .pipe(gulp.dest("build/css"))
        .pipe(rev.manifest())
        .pipe(gulp.dest("rev/css"))
});
//打包html
gulp.task('html', function() {
    return gulp.src(['rev/**/*.json', 'src/*.html'])
        .pipe(collector({
            replaceReved: true //替换文件
        }))
        .pipe(htmlmin(options)) //压缩html
        .pipe(gulp.dest("build"))
});

//打包js
gulp.task('js', function() {
    return gulp.src('src/js/*.js')
        .pipe(es({
            presets: ['es2015']
        }))
        .pipe(uglify())

    .pipe(gulp.dest('build/js'))
});

// gulp.task("watch", function() {
//     gulp.watch("src/sass/*.scss", ["css"])
// })

gulp.task('server', function() {
    return gulp.src('build')
        .pipe(server({
            port: 8080,
            open: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (req.url === '/favicon.ico') {
                    return false;
                }
                if (pathname === '/url') {
                    res.end(JSON.stringify(data))
                } else {
                    if (pathname === '/') {
                        pathname = '/index.html'
                    } else {
                        pathname = pathname
                    }
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }
            }
        }))
})
gulp.task("copyCss", function() {
    return gulp.src("src/css/*.min.css")
        .pipe(gulp.dest("build/css"))
})

gulp.task("clean", function() {
    return gulp.src("build")
        .pipe(clean())
})

gulp.task('default', function(cb) {
    sequence('clean', 'server', ['css', 'html', 'copyCss', 'js'], cb)
})