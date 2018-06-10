var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var mincss = require("gulp-clean-css");
var server = require("gulp-webserver");
var clean = require("gulp-clean");
var sequence = require("gulp-sequence");
var uglify = require("gulp-uglify"); 
var rev = require("gulp-rev");
var revCollector = require("gulp-rev-collector");
var dataJson = require("./data/swiper.json") 

gulp.task("clean", function() {
	return gulp.src("build")
		.pipe(clean())
})

gulp.task("css", function() {
	return gulp.src("src/css/*.scss")
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ["last 2 versions", "Android > 4"]
		}))
		.pipe(mincss())
		.pipe(rev())
		.pipe(gulp.dest("build/css"))
		.pipe(rev.manifest())
		.pipe(gulp.dest("rev/css"))
})

gulp.task("mcss", function() {
	return gulp.src("src/css/*.css")
		.pipe(gulp.dest("build/css"))
})

gulp.task("Img", function() {
	return gulp.src("src/images/*") 
		.pipe(gulp.dest("build/images"))
})

gulp.task("icon", function() {
	return gulp.src("src/icon/*")
		.pipe(gulp.dest("build/icon"))
})

gulp.task("mhtml", function() {
	return gulp.src(["rev/**/*.json","src/**/*.html"])
		.pipe(revCollector({
			replaceReved:true
		}))
		.pipe(gulp.dest("build"))
})

gulp.task("Js", function() {
	return gulp.src("src/js/**/*.js")
		.pipe(uglify())  
		.pipe(gulp.dest("build/js")) 
})

gulp.task("server", ["css"], function() {
	gulp.src("build")
		.pipe(server({
			port: 9090,
			open:true,
			middleware: function(req, res, next) {
				if(req.url === "/api/swiper") {
					res.end(JSON.stringify(dataJson))
				}
				next();
			}
		}))
})

gulp.task("watch", function() {
	gulp.watch("src/css/*.scss", ["css"])
	gulp.watch("src/js/**/*.js", ["Js"])
	gulp.watch("src/**/*.html", ["mhtml"])
})

gulp.task("default", function(cb) {
	sequence("clean", ["css", "Js", "mcss", "icon", "Img", "mhtml"], "watch", "server", cb)
})