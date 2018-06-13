var gulp = require('gulp'); // 引入gulp
var server = require('gulp-webserver'); // 起服务
var path = require('path'); // 引入node内置模块path路径
var url = require('url'); // 引入node内置模块
var fs = require('fs'); // 引入fs读取文件
var data = require('./data/data.json'); // 引入json数据

// 起服务
gulp.task('server',function(){
    gulp.src('src') // 找到要操作的文件
    .pipe(server({
        port:9090, // 配置端口号
        open:true, // 自动打开浏览器
        livereload:true, // 自动刷新页面
        middleware:function(req,res,next){ // 拦截请求数据
            var pathname = url.parse(req.url).pathname;
            if(pathname === '/favicon.ico'){
                return;
            }
            if(pathname === '/api/list'){ 
                // 接口
                res.end(JSON.stringify(data))
            }else{ 
                // 文件
                pathname = pathname === '/' ? 'index.html' : pathname;
                res.end(fs.readFileSync(path.join(__dirname,'src',pathname)))
            }
        }
    }))
})