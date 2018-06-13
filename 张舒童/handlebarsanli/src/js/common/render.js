//自定义模块
define(['jquery', 'handlebars'], function($, handlebars) {
    function render(source, cla, data) {
        var list = $(source).html();
        var template = handlebars.compile(list);
        handlebars.registerHelper('li', function(index, option) {
            if (index < 3) {
                return option.fn(this)
            } else {
                return option.inverse(this)
            }
        })
        handlebars.registerHelper('addIndex', function(index) {
            return index + 1
        })
        var html = template(data);
        $(cla).html(html)
    }
    return render
})