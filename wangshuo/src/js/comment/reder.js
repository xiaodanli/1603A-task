define(['jquery', 'handlebars'], function($, handlebars) {
    function render(element, res, coment) {
        //接受模板
        var tpl = $(element).html();
        //预编译
        var template = Handlebars.compile(tpl);
        //传入数据
        Handlebars.registerHelper('addIndex', function(index) {
            return index + 1;
        });
        Handlebars.registerHelper('limit', function(index, option) {
            if (index < 5) {
                return option.fn(this);
            } else {
                return option.inverse(this);
            }
        });
        //匹配内容
        var html = template(res);
        //输入模板（渲染页面）
        $(coment).html(html);
    }
    return render;
})