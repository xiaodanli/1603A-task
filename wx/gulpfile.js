//  引用模块
var gulp = require('gulp'),
    sass = require('gulp-sass'), //编译scss
    autoprefixer = require('gulp-autoprefixer'), //自动添加前缀
    minCss = require('gulp-clean-css'), //压缩css
    uglify = require('gulp-uglify'), //压缩js
    htmlmin = require('gulp-htmlmin'), //压缩html
    server = require('gulp-webserver'), //起服务
    rev = require('gulp-rev'), //添加md5后缀
    collector = require('gulp-rev-collector'), //替换路径
    url = require('url'), //操作url
    fs = require('fs'), //操作文件
    path = require('path'), //操作路径
    sequence = require('gulp-sequence'); //同步任务
gulp.task('server', function() {
        gulp.src('build')
            .pipe(server({
                port: 8888,
                host: 'localhost',
                livereload: true,
                middleware: function(req, res, next) {
                    var pathName = url.parse(req.url, true),
                        pathName;
                    if (pathName === '/favicon.ico') {
                        return false
                    }
                    pathName = pathName === '/' ? '/index.html' : pathName;
                    res.end(fs.readdirSync(path.join(__dirname, 'src', pathName)))
                }
            }))
    })
    //编译scss
gulp.task('devCss', function() {
        gulp.src('src/scss/*.scss')
            .pipe(sass())
            .pipe(autoprefixer({
                browsers: ['last 2 versions', 'Android>=4.0']
            }))
            .pipe(minCss())
            .pipe(gulp.dest('src/css'))
    })
    //压缩js
gulp.task('uglify', function() {
        return gulp.src('src/js/*.js', { base: 'src' })
            .pipe(uglify())
            .pipe(rev())
            .pipe(gulp.dest('build'))
            .pipe(rev.manifest())
            .pipe(gulp.dest('rev'))
    })
    //压缩html
gulp.task('htmlmin', function() {
        return gulp.src(['rev/*.json', 'src/**/*.html', 'src/*.html'])
            .pipe(collector({
                replaceReved: true
            }))
            .pipe(htmlmin({
                collapseWhitespace: true
            }))
            .pipe(gulp.dest('build'))
    })
    //压缩scss
gulp.task('buildCss', function() {
        return gulp.src('src/scss/*scss')
            .pipe(sass())
            .pipe(autoprefixer({
                browsers: ['last 2 versions', 'Android>=4.0']
            }))
            .pipe(minCss())
            .pipe(rev())
            .pipe(gulp.dest('build/css'))
            .pipe(rev.manifest())
            .pipe(gulp.dest('rev'))
    })
    //压缩css
gulp.task('copyCss', function() {
        return gulp.src('src/css/*.css')
            .pipe(rev())
            .pipe(gulp.dest('build/css'))
            .pipe(rev.manifest())
            .pipe(gulp.dest('rev'))
    })
    //监听scss 自动编译css
gulp.task('watch', function() {
        gulp.watch('src/scss/*.scss', ['devCss'])
    })
    //开发任务
gulp.task('default', ['devCss', 'watch', 'server'])
    //打包上传
gulp.task('build', function(cd) {
    sequence(['buildCss', 'copyCss'], 'uglify', 'htmlmin', cd)
})