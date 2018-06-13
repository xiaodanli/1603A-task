define(['jquery', 'handlebars'], function($, handlebars) {
    function render(data, source, tag) {
        var tpl = source.html();
        var template = handlebars.compile(tpl);
        handlebars.registerHelper('addIndex', function(index) {
            return index + 1
        });
        handlebars.registerHelper('limit', function(index, option) {
            if (index < 3) {
                return option.fn(this)
            } else {
                return option.inverse(this)
            }
        });
        var html = template(data);
        tag.append(html);
    }
    return render;
})