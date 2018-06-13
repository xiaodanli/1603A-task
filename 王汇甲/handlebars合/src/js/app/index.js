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
            handlebars.registerHelper('limit', function(param, opation) {
                if (param < 5) {
                    return opation.fn(this)
                } else {
                    //不符合的
                    return opation.inverse(this)
                }
            })
            var html = template(res);
            $('.list').html(html)
        },
        error: function(error) {
            console.warn(error)
        }
    })
})