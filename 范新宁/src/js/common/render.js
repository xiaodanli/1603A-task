define(['jquery', 'handlebars'], function($, Handlebars) {
    function render(source, target, data) {
        var tpt = $(source).html();
        var template = Handlebars.compile(tpt);
        Handlebars.registerHelper('addIndex', function(index) {
            return index + 1;
        })
        Handlebars.registerHelper('limit', function(index, options) {
            if (index < 5) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        })
        var html = template(data)
        $(target).html(html);
    }
    return render;
})