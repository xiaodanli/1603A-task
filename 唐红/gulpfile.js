var gulp = require("gulp");
var server = require("gulp-webserver");
var fs = require("fs");
var url = require("url");
var path = require("path");
var dataJson = require("./data/list.json");

gulp.task("server", function() {
	gulp.src("src")
		.pipe(server({
			port: 1000,
			open:true,
			middleware: function(req, res, next) {
				var pathname = url.parse(req.url).pathname;
				if (pathname === "/favicon.ico") {
					return false;
				}
				pathname = pathname === "/" ? "/index.html" : pathname;
				if (pathname === "/api/list") {
					res.end(JSON.stringify(dataJson))
				} else {
					res.end(fs.readFileSync(path.join(__dirname, "src", pathname)));
				}
			}
		}))
})