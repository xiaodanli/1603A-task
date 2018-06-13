require(['jquery', 'handlebars'], function($, handlebars) {
    $.ajax({
        url: '/api/list',
        dataType: 'json',
        success: function(data) {
            //获取handlebars模板
            var tpl = $("#tpl").html();
            //预编译模板
            var temlate = handlebars.compile(tpl);

            //index
            handlebars.registerHelper('addIndex', function(index) {
                return index + 1
            })

            //只限制5条
            handlebars.registerHelper('limit', function(param, options) {
                if (param < 5) {
                    return options.fn(this)
                } else {
                    return options.inverse(this)
                }
            })
            var html = temlate(data)
                //渲染到页面
            $("#list").html(html)
        },
        error: function(error) {
            console.warn(error)
        }
    })
})