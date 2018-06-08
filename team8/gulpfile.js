var gulp = require("gulp");
var webserver = require("gulp-webserver");
var url = require("url");


gulp.task("server", function() {
    gulp.src("./src")
        .pipe(webserver({
            port: 8089,
            host: "localhost",
            livereload: true,
            middleware: function(req, res, next) {
                var str = url.parse(req.url, true);
                if (str.pathname === "/login") {
                    var arr = [];
                    req.on("data", function(chunk) {
                        arr.push(chunk);
                    });
                    req.on("end", function() {
                        var arr1 = arr.concat().toString()

                        var json = require("querystring").parse(arr1);
                        if (json.user === "wzgcxy") {
                            res.end(JSON.stringify({ code: 1, msg: "登录成功" }));
                        } else {
                            res.end(JSON.stringify({ code: 0, msg: "登录失败" }));
                        }
                        next();
                    });
                    return false;
                }
                next();
            }
        }))
});
gulp.task("default", ["server"]);