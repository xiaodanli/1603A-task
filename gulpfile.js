var gulp = require('gulp');
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
})