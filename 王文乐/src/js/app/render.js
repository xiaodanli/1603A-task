define(['jquery', 'handlebars'], function($, handlebars) {
    function render(source, target, data) {
        var tpl = $(source).html();
        var template = handlebars.compile(tpl);
        handlebars.registerHelper('addIndex', function(index) {
            return index + 1;
        });
        handlebars.registerHelper('limit', function(param, option) {
            if (param < 5) {
                return option.fn(this);
            } else {
                return option.inverse(this);
            }
        });
        var html = template(data);
        $(target).html(html);
    }
    return render;
});