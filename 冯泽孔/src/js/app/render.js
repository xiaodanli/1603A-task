define(['jquery', 'handlebars'], function($, handlebars) {
    function render(one, two, rs) {
        var data = JSON.parse(rs);
        var Sql = $(one).html();
        handlebars.registerHelper('addIndex', function(index) {
            return index + 1
        })
        var template = handlebars.compile(Sql);
        var html = template(data);
        $(two).append(html)
    }
    return render;
})