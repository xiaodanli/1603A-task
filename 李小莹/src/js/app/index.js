require(['jquery', 'handlebars'], function($, handlebars) {
    $.ajax({
        url: '/api/list',
        dataType: 'json',
        success: function(res) {
            // console.log(res)
            //获取handlebars模板
            var tpl = $('#tpl').html();
            //预编译模板
            var template = handlebars.compile(tpl);
            handlebars.registerHelper('addIndex', function(index) {
                return index + 1
            })
            handlebars.registerHelper('limit', function(param, option) {
                if (param < 5) {
                    return option.fn(this) //符合条件
                } else {
                    return option.inverse(this) //不符条件
                }
            })
            var html = template(res); //匹配json内容
            $('ul').html(html)
        },
        error: function(error) {
            console.warn(error);
        }
    })
})