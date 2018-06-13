define(['jquery', 'handlebars'], function($, handlebars) {
    $.ajax({
        url: '/app/list',
        success: function(rs) {
            var data = JSON.parse(rs);
            var Sql = $("#render").html();
            handlebars.registerHelper('addIndex', function(index) {
                return index + 1
            })
            var template = handlebars.compile(Sql);
            var html = template(data);
            $("#list").append(html)
        },
        error: function(err) {
            console.warn(err)
        }
    })
})