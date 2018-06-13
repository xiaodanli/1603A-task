require(['jquery', 'render'], function($, render) {
    $.ajax({
        url: '/api/list',
        dataType: 'json',
        success: function(res) {
            render(res, '#list_tpl', '#list');
        },
        error: function(error) {
            console.warn(error);
        }
    })
})