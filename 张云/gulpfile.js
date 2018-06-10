var gulp = require('gulp'); 
var clean = require('gulp-clean');  // 删除指定文件
var concat = require('gulp-concat'); // 合并文件
var rev = require('gulp-rev'); // 在文件名后生成MD5随机数
var collector = require('gulp-rev-collector'); // 替换文件路径
var server = require('gulp-webserver'); // 起服务
var babel = require('gulp-babel'); // 编译es6语法  依赖babel-preset-es2015
var sass = require('gulp-sass'); // 操作scss文件
var autoprefixer = require('gulp-autoprefixer'); // 自动添加前缀
var uglify = require('gulp-uglify'); // 压缩js文件
var cleanCss = require('gulp-clean-css'); //压缩css文件
var sequence = require('gulp-sequence'); // 设置gulp任务执行的顺序
var htmlmin = require('gulp-htmlmin');
var path = require('path');
var fs = require('fs');
var url = require('url');
var json = require('./data/list.json');

// 起服务
gulp.task("server",function(){
     gulp.src('src')
    .pipe(server({
        port:9090,
        open:true,
        livereload:true,
        middleware:function(req,res,next){
            var pathname = url.parse(req.url).pathname;
            if(pathname === '/favicon.ico'){
                return false;
            }
            if(pathname === '/mock'){ // 接口
                res.end(JSON.stringify(json))
            }else{ // 文件
                pathname = pathname === '/' ? '/index.html' : pathname;
                res.end(fs.readFileSync(path.join(__dirname,'src',pathname)))
            }
        }
    }))
})
// 压缩js文件
gulp.task('uglify',function(){
    return gulp.src('src/js/**/*.js',{base:'src'})
    .pipe(babel({
        presets:['es2015']
    }))
    .pipe(rev()) // 添加后缀
    .pipe(uglify())
    .pipe(gulp.dest('build'))
    .pipe(rev.manifest()) // 生成映射文件
    .pipe(gulp.dest('rev/js'))
})

// 操作css
gulp.task('cleanCss',function(){
    return gulp.src('src/scss/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({
        browsers:["last 2 versions","Android >= 4"]
    }))
    .pipe(rev()) //添加后缀
    .pipe(cleanCss())
    .pipe(gulp.dest('build/css'))
    .pipe(rev.manifest()) // 生成映射文件
    .pipe(gulp.dest('rev/css'))
})

// 删除文件
gulp.task('clean',function(){
    return gulp.src('build')
    .pipe(clean())
})

// 监听文件变化，执行文件
gulp.task('watch',function(){
    gulp.watch('src/scss/*.scss',['cleanCss']);
})

// 操作html
gulp.task('htmlmin',['cleanCss','uglify','server'],function(){
    return gulp.src(['rev/css/*.json','rev/js/*.json','src/**/*.html'])
    .pipe(htmlmin({
        collapseWhitespace:true
    }))
    .pipe(collector({
        replaceReved:true
    }))
    .pipe(gulp.dest('build'))
})

gulp.task('build',function(cb){
    sequence('clean','cleanCss','uglify','htmlmin',cb)
})
