require(['jquery', 'handlebars'], function($, handlebars) {
    $.ajax({
        url: '/api/list',
        dataType: 'json',
        success: function(data) {
            var tpl = $('#box').html();
            var template = handlebars.compile(tpl);
            handlebars.registerHelper('addIndex', function(index) {
                return index + 1;
            })
            handlebars.registerHelper('limit', function(index, option) {
                if (index < 5) {
                    return option.fn(this);
                } else {
                    return option.inverse(this);
                }
            })
            var html = template(data.datalist);
            //console.log(data.datalist);
            $('#list').html(html);
        },
        error: function(error) {
            console.warn(error);
        }
    });
});