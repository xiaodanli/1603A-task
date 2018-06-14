var gulp = require("gulp");
var sass = require("gulp-sass");
var server = require("gulp-webserver");
var autoprefixer = require("gulp-autoprefixer");
var sequence = require("gulp-sequence");
var clean = require("gulp-clean");
var querystring = require("querystring");
var rev = require("gulp-rev");
var revCollector = require("gulp-rev-collector");
var url = require("url");
var fs = require("fs");
var path = require("path");
var babel = require("gulp-babel");
var preset = require("babel-preset-es2015");
var dataJson = require("./data/prod.json");

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
		// .pipe(rev())
		.pipe(gulp.dest("build/css"))
	// .pipe(rev.manifest())
	// .pipe(gulp.dest("rev/css"))
})

gulp.task("mhtml", function() {
	return gulp.src(["rev/**/*.json", "src/**/*.html"])
		// .pipe(revCollector({
		// 	repleacReved: true
		// }))
		.pipe(gulp.dest("build"))
})

gulp.task("mincss", function() {
	return gulp.src("src/css/*.css")
		.pipe(gulp.dest("build/css"))
})

gulp.task("img", function() {
	return gulp.src("src/img/*")
		.pipe(gulp.dest("build/img"))
})

gulp.task("icon", function() {
	return gulp.src("src/icon/*")
		.pipe(gulp.dest("build/icon"))
})

gulp.task("Js", function() {
	return gulp.src("src/js/**/*.js")
		.pipe(gulp.dest("build/js"))
})

gulp.task("server", ["css"], function() {
	gulp.src("build")
		.pipe(server({
			port: 8000,
			middleware: function(req, res, next) {
				var pathname = url.parse(req.url).pathname;
				if (pathname === "/favicon.ico") {
					return false;
				}
				pathname = pathname === "/" ? "/index.html" : pathname;
				if (pathname === "/api/prod") {
					res.end(JSON.stringify(dataJson))
				} else if (pathname === "/api/list") {
					var data = {
						code:1,
						data:dataJson.list
					}
					res.end(JSON.stringify(data))
				} else if(pathname === "/api/swiper") {
					var data = {
						code:1,
						data:dataJson.swiper
					}
					res.end(JSON.stringify(data))
				} else {
					res.end(fs.readFileSync(path.join(__dirname, "build", pathname)))
				}
			}
		}))
})

gulp.task("watch", function() {
	gulp.watch("src/css/*.scss", ["css"]);
	gulp.watch("src/**/*.html", ["mhtml"]);
	gulp.watch("src/js/**/*.js", ["Js"]);
})

gulp.task("default", function(cb) {
	sequence("clean", ["css", "img", "mhtml", "icon", "Js", "mincss"], "watch", "server", cb);
})