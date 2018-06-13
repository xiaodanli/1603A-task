define(['jquery', 'handlebars'], function($, Handlebars) {
    function render(source, target, res) {
        $.ajax({
            url: "/api/list",
            dataType: 'json',
            success: function(res) {
                //获取模板
                var tpl = $(source).html();
                //编译
                var template = Handlebars.compile(tpl);
                //帮助下标可以加1
                Handlebars.registerHelper('addIndex', function(index) {
                    return index + 1
                });
                //截取
                Handlebars.registerHelper('limit', function(index, options) {
                    if (index < 5) {
                        return options.fn(this)
                    } else {
                        return options.inverse(this)
                    }
                });
                //传入数据
                var obj = template(res);
                //渲染
                $(target).html(obj)
            },
            error: function(error) {
                console.warn(error)
            }
        })
    }
    return render;
})