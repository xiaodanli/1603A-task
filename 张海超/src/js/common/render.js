define(['jquery', 'handlebars'], function($, handlebars) {
    function render(data, source, target) {
        var sou = $(source).html();
        var template = handlebars.compile(sou);
        // 注册帮助
        handlebars.registerHelper("addIndex", function(index) {
                return index + 1;
            })
            // 限制五个以内
        handlebars.registerHelper('limit', function(index, options) {
            if (index < 5) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        })
        var html = template(data);
        $(target).append(html);
    }
    return render;
})