require(['jquery', 'render'], function($, render) {
    $.ajax({
        url: '/api/list',
        dataType: 'json',
        success: function(res) {
            console.log(res);
            render('#tpl', '.ull', res); // 调用render
        },
        error: function(error) {
            console.warn(error);
        }
    })
})