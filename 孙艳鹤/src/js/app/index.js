require(['jquery', 'render'], function($, render) {
    $.ajax({
        url: "/api/list",
        dataType: 'json',
        success: function(res) {
            render('#tpl', '#list', res)
        },
        error: function(error) {
            console.warn(error)
        }
    })
})