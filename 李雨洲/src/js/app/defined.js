define(['jquery', 'handlebars'], function($, handlebars) {
    function render(tpl, uls, res) {
        var tpl = $(tpl).html();
        var template = handlebars.compile(tpl);
        handlebars.registerHelper('addIndex', function(index) {
            return index + 1;
        });
        handlebars.registerHelper('limits', function(index, option) {
            if (index < 5) {
                return option.fn(this);
            } else {
                return option.inverse(this);
            }
        });
        var html = template(res);
        $(uls).append(html);
    }
    return render;
})