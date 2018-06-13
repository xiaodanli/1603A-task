define(['jquery', 'handlebars'], function($, handlebars) {
    function render(template, target, data) {
        var tpl = $(template).html();
        var template = handlebars.compile(tpl);
        handlebars.registerHelper('addIndex', function(index) {
            return index + 1
        })
        handlebars.registerHelper('limit', function(param, option) {
            if (param < 6) {
                return option.fn(this)
            } else {
                return option.inverse(this)
            }
        })
        var html = template(data);
        $(target).html(html)
    }
    return render
})