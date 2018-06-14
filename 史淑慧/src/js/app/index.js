define(['jquery', 'handlebars'], function($, handlebars) {
    $.ajax({
        url: '/api/list',
        datatype: 'json',
        success: function(res) {
            console.log(JSON.parse(res));
            var tpl = $('#tpl').html();
            var template = handlebars.compile(tpl);
            handlebars.registerHelper('addIndex', function(index) {
                console.log(index)
                return index + 1;
            });

            handlebars.registerHelper('Index', function(index, option) {
                if (index < 5) {
                    return option.fn(this);
                } else {
                    return option.inverse(this)
                }
            })
            var html = template(JSON.parse(res));
            $('#table').html(html);
        },
        error: function(error) {
            console.log(error)
        }
    })
})