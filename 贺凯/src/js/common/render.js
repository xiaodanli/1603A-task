define(['jquery', 'handlebars'], function($, handlebars) {
    function render(serve, target, data) {
        //获取handlebars的模板
        var tpl = $(serve).html();
        //预编译模板
        var template = handlebars.compile(tpl);
        //加入帮助index+1
        handlebars.registerHelper('addIndex', function(index) {
            return index + 1;
        });
        handlebars.registerHelper('limit', function(index, options) {
            if (index < 5) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        });
        //传入数据
        var html = template(data);
        //输出到页面
        $(target).html(html);
    }
    return render;
})