var gulp = require("gulp");
var server = require("gulp-webserver");

var url = require("url");
var path = require("path");
var fs = require("fs");

gulp.task("server", function() {
    gulp.src("src")
        .pipe(server({
            port: 8081,
            host: "localhost",
            livereload: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === "/favicon.ico") {
                    return false
                }
                pathname = pathname === "/" ? "index.html" : pathname;
                if (pathname === "api/index") {
                    res.end(JSON.stringify());
                } else {
                    res.end(fs.readFileSync(path.join(__dirname, "src", pathname)));
                }
            }
        }))
});
gulp.task("default", ["server"]);