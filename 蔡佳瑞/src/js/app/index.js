require(['jquery', 'handlebars'], function($, handlebars) {
    $.ajax({
        url: '/url',
        dataType: 'json',
        success: function(res) {
            console.log(res);
            var tpl = $('#text').html();
            var temp = handlebars.compile(tpl);
            handlebars.registerHelper('addindex', function(index) {
                return index + 1
            })
            handlebars.registerHelper('limit', function(param, options) {
                if (param < 5) {
                    return options.fn(this)
                } else {
                    return options.inverse(this)
                }
            })
            var html = temp(res);
            $('#list').html(html);
        },
        error: function(err) {
            console.log(err);
        }
    })
})