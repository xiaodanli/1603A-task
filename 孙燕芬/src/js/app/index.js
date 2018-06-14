require(['jquery', 'handlebars'], function($, handlebars) {
    $.ajax({
        url: '/api',
        dataType: 'json',
        success: function(res) {

            // 获取模板
            var tpl = $('#address').html();

            //预编译的
            var template = handlebars.compile(tpl);
            // 帮助 下标
            handlebars.registerHelper("addIndex", function(index) {
                return index + 1;

            });
            //  limit 长度
            handlebars.registerHelper("limit", function(index, opition) {
                if (index < 5) {
                    //符合条件的
                    return opition.fn(this)
                } else {
                    //不符合条件的
                    return opition.inverse(this)
                }

            })

            // 渲染到页面（ul中）
            var html = template(res)
            $('ul').html(html)
        }
    })
})