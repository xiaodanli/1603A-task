define(['jquery', 'render'], function($, render) {
    $.ajax({
        url: '/api/src',
        dataType: 'json',
        success: function(data) {
            render('#tpl', data, '.list');
        },
        error: function(data) {
            console.warn(data);
        }
    })
})