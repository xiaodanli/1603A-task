define(['jquery', 'handlebars'], function($, handlebars) {
    function render(one, two, rs) {
        var data = JSON.parse(rs);
        var Sql = $().html();
        handlebars.registerHelper('addIndex', function(index) {
            return index + 1
        })
        var template = handlebars.compile(Sql);
        var html = template(data);
        $().append(html)
    }
    return render;
})