require(['jquery', 'handlebars', 'render'], function($, handlebars, render) {
    $.ajax({
        url: '/api/data',
        dataType: 'json',
        success: function(res) {
            console.log(res);
            render(res, $('#tpl'), $('#list'))
        },
        error: function(error) {
            console.warn(error);
        }
    })
})