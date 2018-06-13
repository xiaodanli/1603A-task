require(['jquery', 'render'], function($, render) {
    $.ajax({
        url: '/api/get',
        dataType: 'json',
        success: function(data) {
            render('#tpl', '.list', data);
        },
        error: function(err) {
            console.warn(err);
        }
    });
})