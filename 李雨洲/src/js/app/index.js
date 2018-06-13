require(['jquery', 'defined'], function($, render) {
    $.ajax({
        url: '/list',
        dataType: 'json',
        success: function(res) {
            render('#tpl', '#uls', res);
        },
        error: function(error) {
            console.log(error);
        }
    })
});