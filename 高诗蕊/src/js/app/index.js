require(['jquery', 'handlebars'], function($, handlebars) {
    $.ajax({
        url: '/api/list',
        dataType: 'json',
        success: function(res) {
            console.log(res)
            var tpl = $('#tpl').html();
            var template = handlebars.compile(tpl);
            handlebars.registerHelper('addIndex', function(index) {
                return index + 1
            })
            handlebars.registerHelper('limit', function(param, option) {
                if (param < 5) {
                    //符合条件
                    return option.fn(this)
                } else {
                    //不符合条件的 
                    return option.inverse(this)
                }
            })
            var html = template(res);
            $('#list').html(html)
        },
        error: function(error) {
            console.warn(error);
        }
    })
})