require(['jquery', 'handlebars'], function($, handlebars) {
    $.ajax({
        url: '/api/list',
        dataType: 'json',
        success: function(res) {
            console.log(res);
            var source = $('#form').html();
            var template = handlebars.compile(source);
            handlebars.registerHelper('addIndex', function(index) {
                return index + 1;
            });
            handlebars.registerHelper('limit', function(param, option) {
                if (param < 3) {
                    return option.fn(this)
                } else {
                    return option.inverse(this)
                }
            })
            var html = template(res);
            $('#list').html(html)
        },
        error: function(error) {
            console.warn(error)
        }
    })
})