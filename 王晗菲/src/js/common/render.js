// 定义模块并且配置依赖模块
define(['jquery', 'handlebars'], function($, Handlebars) {
    function render(source, target, data) { // 括号里的参数分别是 模板id名，页面的ul,json数据
        // 获取handlebars的模板
        var tpl = $(source).html();
        // 预编译模板
        var template = Handlebars.compile(tpl);
        // 注册帮助
        Handlebars.registerHelper('addIdx', function(index) {
            return index + 1;
        });
        Handlebars.registerHelper('limit', function(param, option) {
                if (param < 5) {
                    // 返回符合条件的
                    return option.fn(this);
                } else {
                    // 拒绝不符合条件的
                    return option.inverse(this);
                }
            })
            // 传入数据
        var con = template(data);
        // 渲染页面
        $(target).html(con);
    }
    return render; // 返回render方法
})