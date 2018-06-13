require(['jquery', 'handlebars'], function($, handlebars) {
    $.ajax({
        url: "/list",
        dataType: 'json',
        success: function(data) {
            var tpl = $('#tpl').html();
            var template = handlebars.compile(tpl);
            handlebars.registerHelper('addIndex', function(index) {
                return index + 1;
            });
            handlebars.registerHelper('limit', function(index, option) {
                if (index < 5) {
                    return option.fn(this)
                } else {
                    return option.inverse(this)
                }
            });
            var html = template(data);
            $('.list').append(html);
        },
        error: function() {
            console.warn('error!');
        }
    })
})