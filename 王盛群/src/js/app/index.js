require(['jquery', 'handlebars'], function($, handlebars) {
    $.ajax({
        url: '/api/list',
        dataType: 'json',
        success: function(res) {
            console.log(res);
            var tpl = $('#tpl').html();
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
            })
            var html = template(res);
            $('#list').html(html);
        },
        error: function(error) {
            console.log(error);
        }
    })
})