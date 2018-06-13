require.config({
    baseUrl: "/js/",
    paths: {
        // 库文件
        "jquery": "libs/jquery-2.1.1.min",
        "handlebars": "libs/handlebars-v4.0.11",
        // 自己写的文件
        "index": "app/index"
    }
})
require(['index'])