require(['jquery', 'handlebars'], function($, handlebars) {
    $.ajax({
        url: "/list",
        dataType: 'json',
        success: function(res) {
            console.log(res)
            var handle = $('#handle').html();
            var template = handlebars.compile(handle);
            handlebars.registerHelper('addIndex', function(index) {
                return index + 1
            });
            handlebars.registerHelper('page', function(param, option) {
                if (param < 5) {
                    return option.fn(this)
                } else {
                    return option.inverse(this)
                }
            })
            var html = template(res);
            $('ul').html(html)
        },
        error: function(err) {
            console.warn(err)
        }
    })
})