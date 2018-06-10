// 引入模块
var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var minCss = require("gulp-clean-css");
var uglify = require("gulp-uglify");
var htmlmin = require("gulp-htmlmin");
var server = require("gulp-webserver");
var rev = require("gulp-rev");
var collector = require("gulp-rev-collector");
var data = require("./src/data/data.json");
var clean = require("gulp-clean");
var babel = require("gulp-babel");

var url = require("url");
var fs = require("fs");
var path = require("path");
gulp.task("server",['devCss'], function() {
	gulp.src("build")
	.pipe(server({
		port:8085,
		open:true,
		middleware:function(req,res,next){
			var pathname = url.parse(req.url).pathname;
			if(pathname === '/favicon.ico'){
				return;
			}
			if(pathname === '/api/list'){
				res.end(JSON.stringify(data));
			}else{
				pathname = pathname === '/' ?'/index.html':pathname;
				res.end(fs.readFileSync(path.join(__dirname,'src',pathname)))
			}
			
		}
	}))
})
gulp.task("devCss",function(){
	gulp.src("src/scss/*.scss")
	.pipe(sass())
	.pipe(autoprefixer({
		browsers:['last 2 versions','Android >= 4.0']
	}))
	.pipe(minCss())
	.pipe(gulp.dest("src/css"))
})
gulp.task("uglify", ['buildCss','copyCss'], function(){
	return gulp.src("src/js/**/*.js")
	.pipe(babel({  
        presets: ['es2015']  
    }))
	.pipe(uglify())
	.pipe(gulp.dest("build"))
})
var options = {
    collapseWhitespace: true
};
gulp.task('htmlmin', ['uglify'], function(){
	return gulp.src(["rev/**/*.json","src/**/*.html"])
	.pipe(collector({
		replaceReved:true
	}))
	.pipe(htmlmin(options))
	.pipe(gulp.dest("build"))
})
gulp.task("buildCss", ['clean'], function(){
	return gulp.src("src/scss/*.scss")
	.pipe(sass())
	.pipe(autoprefixer({
		browsers:['last 2 versions','Android >= 4.0']
	}))
	.pipe(minCss())
	.pipe(rev())
	.pipe(gulp.dest("build/css"))
	.pipe(rev.manifest())
	.pipe(gulp.dest("rev/css"))
})
gulp.task("copyCss", ['clean'], function(){
	return gulp.src("src/js/**/*.js")
	.pipe(gulp.dest("build"))
})
gulp.task("clean",function(){
	return gulp.src("build")
	.pipe(clean())
})
gulp.task("watch",function(){
	gulp.watch("src/scss/*.scss",["css"])
})
gulp.task("default",['devCss','watch','server']);
gulp.task("build",['htmlmin']);